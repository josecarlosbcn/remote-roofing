import fetch from "node-fetch";
import config from "dotenv";
//To import environment variables
config.config(); 

const getData = (url) => {
    return(
        fetch(url, {
            method: "GET",
            headers: {
                "Accept"        :   "application/json",
                "content-type"  :   "application/json; charset=utf-8",
                "Access-Control-Allow-Origin" : process.env.API_DOMAIN
            },
        })
        .then(response => {
            return response.json();
        })
        .then(data => {
            return data;
        })
        .catch(err => {
            console.log("Error: " + err);
        })    
    );        
};

const postData = (url, data) => {
    return(
        fetch(url, {
            method: "POST",
            headers: {
                "Accept"        :   "application/json",
                "content-type"  :   "application/json; charset=utf-8",
                "Access-Control-Allow-Origin" : process.env.API_DOMAIN
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            return response.json();
        })
        .then(data => {
            //console.log("data: " + Object.keys(data.errors));
            //console.log("id: " + data["data"]["lf1_games"][0]["home_team"]);
            return data;
        })
        .catch(err => {
            console.log("Error: " + err);
        })    
    );        
};


/**
 * First of all, drop the database. We will insert and make querys from the data inserted from the tests
 */

describe("Tests for remote-roofing application", () => {
    test('Get all users from an empty database', async() => {
        let users = await getData(process.env.API_DOMAIN + "/API" + "/users");
        expect(users.rows).toBeDefined();
        expect(users.totalRows).toBeDefined();
        expect(users.totalRows).toBe(0);
        expect(users.rows.length).toBe(0);
    });
    
    test('Get all projects from an empty database', async() => {
        let projects = await getData(process.env.API_DOMAIN + "/API" + "/projects");
        expect(projects.rows).toBeDefined();
        expect(projects.totalRows).toBeDefined();
        expect(projects.totalRows).toBe(0);
        expect(projects.rows.length).toBe(0);
    });
    
    test('Get all tasks from an empty database', async() => {
        let tasks = await getData(process.env.API_DOMAIN + "/API" + "/tasks");
        expect(tasks.rows).toBeDefined();
        expect(tasks.totalRows).toBeDefined();
        expect(tasks.totalRows).toBe(0);
        expect(tasks.rows.length).toBe(0);
    });
    
    test('Insert an user in database', async() => {
        let data = {
            email: "user1@gmail.com",
            name: "Name of the user 1",
            surname: "Surname of the user 1"
        };
        let user = await postData(process.env.API_DOMAIN + "/API" + "/users", data);
        expect(user.id).toBeDefined();
        expect(user.id).toBe(1);
    });
    
    test('Insert another user in database', async() => {
        let data = {
            email: "user2@gmail.com",
            name: "User 2",
            surname: "User 2 Surname"
        };
        let user = await postData(process.env.API_DOMAIN + "/API" + "/users", data);
        expect(user.id).toBeDefined();
        expect(user.id).toBe(2);
    });
    
    test('Insert a project in database', async() => {
        let data = {
            name: "Project 1",
            body: "Description of the project number 1",
            status: "active",
            userID: 1
        };
        let project = await postData(process.env.API_DOMAIN + "/API" + "/projects", data);
        expect(project.id).toBeDefined();
        expect(project.id).toBe(1);
    });
    
    test('Insert a project in database', async() => {
        let data = {
            name: "Project 2",
            body: "Description of the project number 2",
            status: "active",
            userID: 2
        };
        let project = await postData(process.env.API_DOMAIN + "/API" + "/projects", data);
        expect(project.id).toBeDefined();
        expect(project.id).toBe(2);
    });
    
    test('Insert a project in database', async() => {
        let data = {
            name: "Project 3",
            body: "Description of the project number 3",
            status: "inactive",
            userID: 2
        };
        let project = await postData(process.env.API_DOMAIN + "/API" + "/projects", data);
        expect(project.id).toBeDefined();
        expect(project.id).toBe(3);
    });
    
    test('Insert a task in database', async() => {
        let data = {
            name: "Name of the task",
            description: "Description of the task number 1",
            score: 5,
            status: "active",
            userID: 1,
            projectID: 1
        };
        let task = await postData(process.env.API_DOMAIN + "/API" + "/tasks", data);
        expect(task.id).toBeDefined();
        expect(task.id).toBe(1);
    });
    
    test('Insert a task in database', async() => {
        let data = {
            name: "Name of the task",
            description: "Description of the task number 2",
            score: 7,
            status: "inactive",
            userID: 2,
            projectID: 1
        };
        let task = await postData(process.env.API_DOMAIN + "/API" + "/tasks", data);
        expect(task.id).toBeDefined();
        expect(task.id).toBe(2);
    });
    
    test('Insert a task in database', async() => {
        let data = {
            name: "Name of the task",
            description: "Description of the task number 3",
            score: 9,
            status: "active",
            userID: 2,
            projectID: 1
        };
        let task = await postData(process.env.API_DOMAIN + "/API" + "/tasks", data);
        expect(task.id).toBeDefined();
        expect(task.id).toBe(3);
    });
    
    test('Insert a task in database', async() => {
        let data = {
            name: "Name of the task",
            description: "Description of the task number 4",
            score: 9,
            status: "inactive",
            userID: 1,
            projectID: 1
        };
        let task = await postData(process.env.API_DOMAIN + "/API" + "/tasks", data);
        expect(task.id).toBeDefined();
        expect(task.id).toBe(4);
    });
    
    test('Insert a task in database', async() => {
        let data = {
            name: "Name of the task",
            description: "Description of the task number 5",
            score: 3,
            status: "active",
            userID: 2,
            projectID: 2
        };
        let task = await postData(process.env.API_DOMAIN + "/API" + "/tasks", data);
        expect(task.id).toBeDefined();
        expect(task.id).toBe(5);
    });
    
    test('Insert a task in database', async() => {
        let data = {
            name: "Name of the task",
            description: "Description of the task number 6",
            score: 0,
            status: "declined",
            userID: 2,
            projectID: 2
        };
        let task = await postData(process.env.API_DOMAIN + "/API" + "/tasks", data);
        expect(task.id).toBeDefined();
        expect(task.id).toBe(6);
    });
    
    test('Insert a task in database', async() => {
        let data = {
            name: "Name of the task",
            description: "Description of the task number 7",
            score: 10,
            status: "completed",
            userID: 2,
            projectID: 2
        };
        let task = await postData(process.env.API_DOMAIN + "/API" + "/tasks", data);
        expect(task.id).toBeDefined();
        expect(task.id).toBe(7);
    });
    
    test('Get users from database', async() => {
        let users = await getData(process.env.API_DOMAIN + "/API" + "/users");
        expect(users.rows).toBeDefined();
        expect(users.totalRows).toBeDefined();
        expect(users.totalRows).toBe(2);
        expect(users.rows.length).toBe(2);
    });
    
    test('Get all projects from database', async() => {
        let projects = await getData(process.env.API_DOMAIN + "/API" + "/projects");
        expect(projects.rows).toBeDefined();
        expect(projects.totalRows).toBeDefined();
        expect(projects.totalRows).toBe(3);
        expect(projects.rows.length).toBe(3);
    });
    
    test('Get all tasks from database', async() => {
        let tasks = await getData(process.env.API_DOMAIN + "/API" + "/tasks");
        expect(tasks.rows).toBeDefined();
        expect(tasks.totalRows).toBeDefined();
        expect(tasks.totalRows).toBe(7);
        expect(tasks.rows.length).toBe(7);
    });
    
    test('Get users from their name', async() => {
        let users = await getData(process.env.API_DOMAIN + "/API" + "/users/name/Name of the user 1");
        expect(users.rows).toBeDefined();
        expect(users.totalRows).toBeDefined();
        expect(users.totalRows).toBe(1);
        expect(users.rows.length).toBe(1);
    });
    
    test('Get users from their surname', async() => {
        let users = await getData(process.env.API_DOMAIN + "/API" + "/users/surname/Surname of the user 1");
        expect(users.rows).toBeDefined();
        expect(users.totalRows).toBeDefined();
        expect(users.totalRows).toBe(1);
        expect(users.rows.length).toBe(1);
    });
    
    test('Get projects from their name', async() => {
        let projects = await getData(process.env.API_DOMAIN + "/API" + "/projects/name/Project");
        expect(projects.rows).toBeDefined();
        expect(projects.totalRows).toBeDefined();
        expect(projects.totalRows).toBe(3);
        expect(projects.rows.length).toBe(3);
    });
    
    test('Get projects from their description', async() => {
        let projects = await getData(process.env.API_DOMAIN + "/API" + "/projects/description/project");
        expect(projects.rows).toBeDefined();
        expect(projects.totalRows).toBeDefined();
        expect(projects.totalRows).toBe(3);
        expect(projects.rows.length).toBe(3);
    });
    
    test('Get projects from their active status', async() => {
        let projects = await getData(process.env.API_DOMAIN + "/API" + "/projects/status/active");
        expect(projects.rows).toBeDefined();
        expect(projects.totalRows).toBeDefined();
        expect(projects.totalRows).toBe(2);
        expect(projects.rows.length).toBe(2);
    });
    
    test('Get projects from their active and inactive status', async() => {
        let projects = await getData(process.env.API_DOMAIN + "/API" + "/projects/status/active,inactive");
        expect(projects.rows).toBeDefined();
        expect(projects.totalRows).toBeDefined();
        expect(projects.totalRows).toBe(3);
        expect(projects.rows.length).toBe(3);
    });
    
    test('Get projects assigned to userID = 1', async() => {
        let projects = await getData(process.env.API_DOMAIN + "/API" + "/projects/assigned/1");
        expect(projects.rows).toBeDefined();
        expect(projects.totalRows).toBeDefined();
        expect(projects.totalRows).toBe(1);
        expect(projects.rows.length).toBe(1);
    });
    
    test('Get projects assigned to userID 1 or 2', async() => {
        let projects = await getData(process.env.API_DOMAIN + "/API" + "/projects/assigned/1,2");
        expect(projects.rows).toBeDefined();
        expect(projects.totalRows).toBeDefined();
        expect(projects.totalRows).toBe(3);
        expect(projects.rows.length).toBe(3);
    });
    
    test('Get tasks assigned to users ID 1 or 2, status active or inactive and score greater or equal to 8', async() => {
        let tasks = await getData(process.env.API_DOMAIN + "/API" + "/tasks/1,2/active,inactive/8");
        expect(tasks.rows).toBeDefined();
        expect(tasks.totalRows).toBeDefined();
        expect(tasks.totalRows).toBe(2);
        expect(tasks.rows.length).toBe(2);
    });
});

