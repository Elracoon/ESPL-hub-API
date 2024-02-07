import { ObjectId } from 'mongodb';
import { noDataFound } from '../bin/messages-constants.js';
import Project from './models.js';
import User from "../users/models.js"
import { postProjectSchema, updateProjectSchema } from './validation.js';

export async function getAllProject(req, res) {
    try {
        const allProjects = await Project.find({});
        for (const project of allProjects) {
            const managerId = project.projectManager;
            const manager = await User.findById(managerId).select("lastName firstName");
            const managerInfo = manager ? `${manager.lastName} ${manager.firstName}` : null;
            project.projectManager = managerInfo;
        }
        res.status(200).json(allProjects);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}

export async function getOneProject(req, res) {
    const projectId = req.params.id
    try {
        const project = await Project.findOne({_id: new ObjectId(projectId)});
        if (!project) {
            res.status(404).send(noDataFound);
            return;
        }
        const managerId = project.projectManager;
        const manager = await User.findById(managerId).select("lastName firstName");
        const managerInfo = manager ? `${manager.lastName} ${manager.firstName}` : null;
        project.projectManager = managerInfo;
        // const members = project.members
        // for (const member of members) {
        //     const memberData = await User.findById(member).select("lastName firstName");
        //     const memberInfo = memberData ? `${memberData.lastName} ${memberData.firstName}` : null;
        //     project.members.push(memberInfo)
        // }
        res.status(200).json(project);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}

export async function updateProject(req, res) {
    try {
        const updates = req.body;
        const { error } = updateProjectSchema.validate(updates);
        if ( error ) {
            return res.status(400).json({ error: error.details.map((d) => d.message) })
        }
        const projectId = req.params.id;
        const projectUpdate = await Project.findOneAndUpdate({ _id: new ObjectId(projectId) }, updates );
        if (projectUpdate) {
            res.status(201).send('Project Updated');
            return;
        } else {
            res.status(404).send('Project Not Found');
        }
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
}

export async function addNewProject(req, res) {
    const userId = req.user.userId
    try {
        const object = req.body;
        const { error } = postProjectSchema.validate(object);
        if ( error ) {
            return res.status(400).json({ error: error.details.map((d) => d.message) })
        }
        const date = new Date();
        object.createdAt = date
        object.projectManager = userId
        const emailManager = await User.findById(userId).select("email");
        object.managerEmail = emailManager.email
        object.members = [userId]
        const project = new Project(object);
        const projectData = await project.save();
        try {
            const projectId = projectData._id.toString()
            const response = await User.findOneAndUpdate(
                {_id: userId},
                {$push: {projects: {projectId: new ObjectId(projectId), status: "in progress"}}}
            )
            if (!response) {
                return res.status(404).send({message: noDataFound})
            }
        } catch (error) {
            res.status(500).send('Internal Server Error');
        }
        res.status(201).send({message: "Project added with success"});
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
}

export async function deleteProject(req, res) {
    try {
        const projectId = req.params.id;
        const deleteProject = await Project.findOneAndDelete({ _id: new ObjectId(projectId) });
        if (deleteProject) {
            res.status(200).send('Project Deleted');
        } else {
            res.status(404).send('Project Not Found');
        }
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
}

export async function getProjectsByUserByStatus (req, res) {
    const userId = req.user.userId
    const status = req.params.status
    try {
        const userProjects = await User.findById(userId).select('projects');
        if (!userProjects) {
            return res.status(404).send({message: noDataFound})
        }
        const projects = userProjects.projects
        let listProjectId = [];
        for (const project of projects) {
            if (project.status == status) {
                listProjectId.push(project.projectId)
            }
        }
        const dataProjects =  await Project.find({ _id: { $in: listProjectId } });
        for (const project of dataProjects) {
            const managerId = project.projectManager;
            const manager = await User.findById(managerId).select("lastName firstName");
            const managerInfo = manager ? `${manager.lastName} ${manager.firstName}` : null;
            project.projectManager = managerInfo;
        }
        res.status(200).send(dataProjects)
    } catch (error) {
        res.status(500).send({messsage: "Internal Servor Error"})
    }
}

export async function changeStatusProject(req, res) {
    const userId = req.user.userId
    const projectId = req.body.projectId
    const status = req.body.status
    try {
        const project = await Project.findById(projectId);
        if (!project) {
            return res.status(404).send({message: noDataFound})
        }
        const managerId = project.projectManager
        if (managerId !== userId) {
            return res.status(401).send({message : "Unauthorized to change the status"})
        }
        const projects = await User.findById(userId).select("projects");
        console.log(projects);
        for (const project of projects.projects) {
            if (project.projectId == projectId) {
                project.status = status
            }
        }
        await projects.save()
        return res.status(200).send("Update success")
    } catch (error) {
        console.error(error);
        res.status(500).send({message: "Internal Server Error"})
    }
}