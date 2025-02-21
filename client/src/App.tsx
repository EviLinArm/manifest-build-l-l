import Manifest from "@mnfst/sdk";
import {useEffect, useState} from "react";

type Project = {
    id: string;
    createDate: string;
    typeOfActivity: string;
}

function App() {
    const [projects, setProjects] = useState<Project[]>([]);

    useEffect(() => {
        const manifest = new Manifest()
        manifest.login('admins','test@mail.com', '123456789').then(() => {
           manifest
               .from("projects")
               // .orderBy('createDate', { desc: false })
               // .with(['client', 'client.profession', 'client.services', 'worker', 'worker.position', 'worker.services'])
               .find<Project>()
               .then((projects: {data: Project[]}) => {
                   console.log(projects.data)
                   setProjects(projects.data)
            })

        })
    }, []);

    return (
        <>
            <h2>Projects list:</h2>
            {
                projects.length > 0 && (
                    projects.map((project) => {
                        return (
                            <div style={{display: 'flex', flexDirection: 'column', gap: '15px'}} key={project.id}>
                                <p style={{display: 'flex', flexDirection: 'column', gap: '5px', border: '1px solid white', padding: '5px', borderRadius: '5px'}}>
                                    <span>Id: {project.id}</span>
                                    <span>Create date: {project.createDate}</span>
                                    <span>Type of activity: {project.typeOfActivity}</span>
                                </p>
                            </div>
                        )
                    })
                )
            }
        </>
    )
}

export default App
