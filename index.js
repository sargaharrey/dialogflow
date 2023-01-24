const express = require('express');
const app = express();
const multer = require('multer');
const fs = require('fs');
var fuzzy = require('fuzzy');

var entitiesArr = []
var intentsArr = []

var data = []
// Set multer file storage folder
const upload = multer({ dest: '/' })
app.set('view engine', 'ejs');

const { google } = require('googleapis');
const dialogflow = google.dialogflow('v2');

const key = require('./fourth.json')
// Create a JWT client
const jwtClient = new google.auth.JWT(
    key.client_email,
    null,
    key.private_key,
    ['https://www.googleapis.com/auth/dialogflow']
    //   { keyFile: './fourth.json'},
    //     ['https://www.googleapis.com/auth/dialogflow']
);

const auth = new google.auth.JWT(
    key.client_email,
    null,
    key.private_key,
    ['https://www.googleapis.com/auth/dialogflow']



);
var url = require('url');
const { iam } = require('googleapis/build/src/apis/iam');



authIDs = ['./newagent-9sfy-0cdcd6bfc506.json', './fourth.json', './fvf-rsbn-390b279cfdad.json']
// Authenticate the JWT client
jwtClient.authorize((err, tokens) => {
    if (err) {
        console.log(err);
        return;
    }
})


var responses = []
  var projects = []
// Use the JWT client to create a Dialogflow client
// const auth = new google.dialogflow({ version: 'v2', auth: jwtClient });

const projectId = 'oversoft-35450';
//  const client = new dialogflow.AgentsClient({
//      projectId: projectId,
//        keyFilename: './fourth.json',
//      });

// const intentsClient =new client.IntentsClient();
// const entitiesClient =new  client.EntityTypesClient();



// app.get('/', async (req, res) => {
//     // const request = {
//     //     parent: intentsClient.projectAgentPath(projectId),
//     // };

//     const responses = await dialogflow.projects.agent.intents.list({
//         auth: auth,
//         parent: `projects/${projectId}/agent`
//     })

//     const intents = responses.data.intents;
//     console.log(intents)

//     res.render('intents', { intents });

// });

app.get('/', async (req, res) => {
    // const request = {
    //     parent: intentsClient.projectAgentPath(projectId),
    // };

    // const intents = responses.data.intents;
    // console.log(intents)
    // res.render('intents', projectId);
    projectIds = authIDs.map(item => ({ item: item, id: require(item).project_id }))
    console.log(projectIds)
    res.render('projects', projectIds)

});



app.get('/upload',  async (req, res) => {

    // console.log(req)
    const file = require(`./${req.url.split('=')[1].substr(-4)}`)
    // console.log('======================', `./${req.url.split('=')[1]}`)
    const auth = new google.auth.JWT(
      file.client_email,
      null,
      file.private_key,
      ['https://www.googleapis.com/auth/dialogflow']
    );
   
     responses.push(await dialogflow.projects.agent.entityTypes.list({
        auth: auth,
         parent: `projects/${file.project_id}/agent`
    }))
    // console.log(authIDs) 
    
    authIDs.push(`./${req.url.split('=')[1]}`) 
    // console.log(auth)
    res.redirect('/');

});

app.get('/search', async (req, res) => {
   
    const regex = new RegExp(`projects=(.*?)(&)`);
    var searchParameter = req.url.split('parameter=')[1];
    console.log(searchParameter)
    console.log(req.query.parameters )
    var files = req.url.split(regex);
    var DFS = files.filter(i => i != '' && i != '&')

    var DFSFiles = authIDs.filter(item => DFS.map(project => item.includes(project) ))

    var DFSFilesRoutes = DFSFiles.map(item => require(item))
    console.log(DFSFilesRoutes[0])
    // console.log('.............................', DFSFiles )
    var projectIds = req.query.projects
    var result = []
    var result2 = []

    console.log(projectIds)
    // console.log(authIDs, projectIds) 
 
    // var url_parts = url.parse(req.url, true);
    // var query = url_parts.query;
    // console.log(query)
    const dialogflow = require('dialogflow');
 
    // console.log()
    for (let i = 0; i < DFSFilesRoutes.length;i++){
        
        // ids.push(DFSFilesRoutes[i])
        // Set the project ID and auth credentials
        // const projectId = 'oversoft-35450';
        // const credentials = {

        // };
        // console.log(DFSFilesRoutes[1].project_id)

        // Create a new client
        console.log('======================================================================')
        const clientIntents = new dialogflow.v2.IntentsClient(

            { credentials:DFSFilesRoutes[i] }
        );
        const clientEntites = new dialogflow.v2.EntityTypesClient(

            { credentials: DFSFilesRoutes[i] }    
        );

        const agentPathIntent = clientIntents.projectAgentPath(`${DFSFilesRoutes[i].project_id}`);
     const agentPathEntity = clientEntites.projectAgentPath(`${DFSFilesRoutes[i].project_id}`);

        // , query: `displayName:${searchParameter}` 
        clientIntents.listIntents({ parent: agentPathIntent, query:`name:${searchParameter}` })
            .then(responses => {
                const intents = responses[0];
                // console.log('Intents:');
               intentsArr.push(intents)})
            .catch(err => {
                console.error('Failed to list intents:', err);
            });

            

        clientEntites.listEntityTypes({ parent: agentPathEntity, query: `name:${searchParameter}` })
            .then(responses => {
                const entities = responses[0];
                // console.log('entities:');
                entitiesArr.push(entities)
                
            }).catch(err => {
                console.error('Failed to list intents:', err);
            });
   
        }
    // console.log(encodeURIComponent(searchParameter))
    // const filterd = Object.entries(intents).map(item => ite==)
    console.log(searchParameter.replace(/[+]/g, ' ')) 
   
    // console.log(';;;;;;;;;;;;;;;;;;;;;',intents,entities)
    // var dat = fuzzy.filter(`${searchParameter}`, intentsArr)     

    if (req.query.parameters === 'action'){

        result.push(intentsArr.flat(6).filter(item => item.action === searchParameter.replace(/[+]/g, ' ')))
        result2.push(entitiesArr.flat(6).filter(item => item.action === searchParameter.replace(/[+]/g, ' ')))

    }
    else if (req.query.parameters === 'name'){
        result.push(intentsArr.flat(6).filter(item => item.name === searchParameter.replace(/[+]/g, ' ')))
        result2.push(entitiesArr.flat(6).filter(item => item.name === searchParameter.replace(/[+]/g, ' ')))
    }
    else {
        result.push(intentsArr.flat(6).filter(item => item.displayName === searchParameter.replace(/[+]/g, ' ')))
        result2.push(entitiesArr.flat(6).filter(item => item.displayName === searchParameter.replace(/[+]/g, ' ')))
    }
    //  console.log('111111111111111111', intentsArr.flat(6).filter(item => item.displayName === searchParameter.replace(/[+]/g, ' ')  ))
    console.log(result)
    // let extractedString = myString.substring(startIndex, endIndex);
 data.push(result)
    data.push(result2)

    console.log('cccccccccccccccccccccc', result, result2)

    //  var finnal = [result, result2]
    // var finnal = result
    res.render('DataTables', { result, result2 });
    // console.log(req.query)

    // const auth = new google.auth.JWT(
    //   req.file.path.client_email,
    //   null,
    //   req.file.path.private_key,
    //   ['https://www.googleapis.com/auth/dialogflow']
    // );
    // authIDs.push(`${__dirname}/${req.query.upload}`) 
    // //  responses.push(await dialogflow.projects.agent.entityTypes.list({
    // //     auth: auth,
    // //     parent: `projects/${req.path.split('=')[1]}/agent`
    // // }))
    // console.log(authIDs)
    // console.log(auth)
    // res.redirect('/');
        
});


// app.get('/projects', async (req, res) => {
//     // const request = {
//     //     parent: intentsClient.projectAgentPath(projectId),
//     // };
//     const projectPath = req.params.Id
//     console.log(authIDs[projectPath])
//     const key = require(authIDs[projectPath])
//     const jwtClient = new google.auth.JWT(
//         key.client_email,
//         null,
//         key.private_key,
//         ['https://www.googleapis.com/auth/dialogflow']
//         //   { keyFile: './fourth.json'},
//         //     ['https://www.googleapis.com/auth/dialogflow']
//     );
//     const entitesResponses = await dialogflow.projects.agent.entityTypes.list({
//         auth: jwtClient,
//         parent: `projects/${key.project_id}/agent`
//     })
//     const intntsResponses = await dialogflow.projects.agent.intents.list({
//         auth: jwtClient,
//         parent: `projects/${key.project_id}/agent`
//     })
//     //  const intents = responses.data.intents;
//     // // console.log(intents)
//     // // res.render('intents', projectId);
//     // projectIds = ['newagent-9sfy', 'oversoft-35450', 'fvf-rsbn']



//     //  const entities = entitesResponses.data.entityTypes;
//     // console.log(entities)
//     // res.render('entities', { entities });

//     // const intities = intntsResponses



//     // intentsClient
//     //     .batchUpdateIntents(request2)
//     //     .then(responses => {
//     //         console.log(`Intents updated: ${responses[0]}`);
//     //         const getIntentRequest = { name: responses[0] };
//     //         // Call the getIntent method
//     //         console.log('==============================================================================================', intentsClient.getIntent(getIntentRequest));
//     //     })
//     //     .catch(err => {
//     //         console.error(`Error updating intents: ${err}`);
//     //     });
//     // res.redirect('/')

//     const data = [entitesResponses.data.entityTypes, intntsResponses.data.intents]
//     // console.log(data[0].entityTypes, data[1].intents)   
//     // console.log(data[0][0].displayName, data[1][00].displayName)
//     console.log(data)
//     res.render('index.ejs', { data })


// });

// app.get('/entities', async (req, res) => {

//     const responses = await dialogflow.projects.agent.entityTypes.list({
//         auth: auth,
//         parent: `projects/${projectId}/agent`
//     })

//     const entities = responses.data.entityTypes;
//     console.log(entities)
//     res.render('entities', { entities });
// });


app.get(/customzie/ , async (req, res) => {

    console.log(req.path.split('/')[2])
    // Get the updated entities and intents from the request body
    const { entity } = req.query;
    const { intent} = req.query;

    console.log(intent, entity)
    const intentsClient = await dialogflow.projects.agent.intents
    console.log(intentsClient)
    const entitiesClient = await dialogflow.projects.agent.entityTypes

    // Create the request
    const request = {
        name: `projects/${projectId}/agent/`,
        requestBody: {
                   // request body parameters
                
                  "autoExpansionMode": "my_autoExpansionMode",
                  "displayName": "my_displayName",
                  "enableFuzzyExtraction": false,
                  "entities": [],
                  "kind": "my_kind",
                  "name": "my_name"
                
              },
    };
    const request2 = {
        name: `projects/${projectId}/agent`,
        intents: { entity: entity }
    };


    if (intent) {
    intentsClient
        .patch(request)
        // .then(responses => {
        //     console.log(`Intents updated: ${responses[0]}`);
        //     const getIntentRequest = { name: responses[0] };
        //     // Call the getIntent method
        //     console.log('==============================================================================================', intentsClient.getIntent(getIntentRequest));
        // })
        // .catch(err => {
        //     console.error(`Error updating intents: ${err}`);
        // });
    }
    if (entity){
    entitiesClient
        .patch(request2)
        // .then(responses => {
        //     console.log(`Intents updated: ${responses[0]}`);
        //     const getIntentRequest = { name: responses[0] };
        //     // Call the getIntent method
        //     console.log('==============================================================================================', intentsClient.getIntent(getIntentRequest));
        // })
        // .catch(err => {
        //     console.error(`Error updating intents: ${err}`);
        // });

    }
        res.redirect('/')
});

app.listen(3000, () => {
    console.log('Server started on port 3000');
});
