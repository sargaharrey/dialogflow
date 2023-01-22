const express = require('express');
const app = express();
const multer = require('multer');
const fs = require('fs');


const upload = multer();

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



authIDs = ['./newagent-9sfy-0cdcd6bfc506.json', './fourth.json', './fvf-rsbn-390b279cfdad.json']
// Authenticate the JWT client
jwtClient.authorize((err, tokens) => {
  if (err) {
    console.log(err);
    return;
  }
})


var responses = []
  ;
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

app.post('/upload', upload.single('jsonFile'), async (req, res) => {



  const auth = new google.auth.JWT(
    req.file.path.client_email,
    null,
    req.file.path.private_key,
    ['https://www.googleapis.com/auth/dialogflow']
  );
  authIDs.push(req.file.path)
  //  responses.push(await dialogflow.projects.agent.entityTypes.list({
  //     auth: auth,
  //     parent: `projects/${req.file.path.project_id}/agent`
  // }))

  res.redirect('/');

});
app.get('/', async (req, res) => {
  // const request = {
  //     parent: intentsClient.projectAgentPath(projectId),
  // };



  // const intents = responses.data.intents;
  // console.log(intents)
  // res.render('intents', projectId);
  projectIds = ['newagent-9sfy', 'oversoft-35450', 'fvf-rsbn']
  res.render('projects', projectIds)

});


app.get('/projects/:Id', async (req, res) => {
  // const request = {
  //     parent: intentsClient.projectAgentPath(projectId),
  // };
  const projectPath = req.params.Id
  console.log(authIDs[projectPath])
  const key = require(authIDs[projectPath])
  const jwtClient = new google.auth.JWT(
    key.client_email,
    null,
    key.private_key,
    ['https://www.googleapis.com/auth/dialogflow']
    //   { keyFile: './fourth.json'},
    //     ['https://www.googleapis.com/auth/dialogflow']
  );
  const entitesResponses = await dialogflow.projects.agent.entityTypes.list({
    auth: jwtClient,
    parent: `projects/${key.project_id}/agent`
  })
  const intntsResponses = await dialogflow.projects.agent.intents.list({
    auth: jwtClient,
    parent: `projects/${key.project_id}/agent`
  })
  //  const intents = responses.data.intents;
  // // console.log(intents)
  // // res.render('intents', projectId);
  // projectIds = ['newagent-9sfy', 'oversoft-35450', 'fvf-rsbn']



  //  const entities = entitesResponses.data.entityTypes;
  // console.log(entities)
  // res.render('entities', { entities });

  // const intities = intntsResponses



  // intentsClient
  //     .batchUpdateIntents(request2)
  //     .then(responses => {
  //         console.log(`Intents updated: ${responses[0]}`);
  //         const getIntentRequest = { name: responses[0] };
  //         // Call the getIntent method
  //         console.log('==============================================================================================', intentsClient.getIntent(getIntentRequest));
  //     })
  //     .catch(err => {
  //         console.error(`Error updating intents: ${err}`);
  //     });
  // res.redirect('/')

  const data = [entitesResponses.data.entityTypes, intntsResponses.data.intents]
  // console.log(data[0].entityTypes, data[1].intents)   
  // console.log(data[0][0].displayName, data[1][00].displayName)
  res.render('index.ejs', { data })


});

// app.get('/entities', async (req, res) => {

//     const responses = await dialogflow.projects.agent.entityTypes.list({
//         auth: auth,
//         parent: `projects/${projectId}/agent`
//     })

//     const entities = responses.data.entityTypes;
//     console.log(entities)
//     res.render('entities', { entities });
// });


// app.get('/customize', async (req, res) => {


//     // Get the updated entities and intents from the request body
//     const { entities } = req.query.entities;
//     const { intents } = req.query.intents;


//     const intentsClient = new dialogflow.IntentsClient();


//     // Create the request
//     const request2 = {
//         parent: `projects/${projectId}/agent`,
//         intents: { aa: 'aaa' }
//     };


//     intentsClient
//         .batchUpdateIntents(request2)
//         .then(responses => {
//             console.log(`Intents updated: ${responses[0]}`);
//             const getIntentRequest = { name: responses[0] };
//             // Call the getIntent method
//             console.log('==============================================================================================', intentsClient.getIntent(getIntentRequest));
//         })
//         .catch(err => {
//             console.error(`Error updating intents: ${err}`);
//         });
//         res.redirect('/')
// });

app.listen(3000, () => {
  console.log('Server started on port 3000');
});