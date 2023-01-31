    const express = require('express');
    const app = express();
    const multer = require('multer');
    const fs = require('fs');
    var fuzzy = require('fuzzy');
    var param= []
    var entitiesArr = []
    var intentsArr = []
    var names = []
    var df = []
    var data = []
    // Set multer file storage folder
    const upload = multer({ dest: '/' })
    app.set('view engine', 'ejs');

    const { google } = require('googleapis');
    const dialogflow = google.dialogflow('v2');

    // const key = require('./fourth.json')
    // // Create a JWT client
    // const jwtClient = new google.auth.JWT(
    //     key.client_email,
    //     null,
    //     key.private_key,
    //     ['https://www.googleapis.com/auth/dialogflow']
    //     //   { keyFile: './fourth.json'},
    //     //     ['https://www.googleapis.com/auth/dialogflow']
    // );

    // const auth = new google.auth.JWT(
    //     key.client_email,
    //     null,
    //     key.private_key,
    //     ['https://www.googleapis.com/auth/dialogflow']



    // );
    var url = require('url');
    const { iam } = require('googleapis/build/src/apis/iam');
    const { dfareporting } = require('googleapis/build/src/apis/dfareporting');
    const { dirname } = require('path');


    authIDs = ['./newagent-9sfy-0cdcd6bfc506.json', './fourth.json', './fvf-rsbn-390b279cfdad.json']
    // Authenticate the JWT client
    jwtClient.authorize((err, tokens) => {
        if (err) {
            console.log(err);
            return;
        }
    })

    // app.use(responseTime((req, res, time) => {
    //     res.setHeader('Cache-Control', 'no-cache');
    //     res.setHeader('Expires', '-1');
    // }));
    var responses = []
    var projects = []
    // Use the JWT client to create a Dialogflow client
    // const auth = new google.dialogflow({ version: 'v2', auth: jwtClient });

    const projectId = 'oversoft-35450';
    var parameter  = []
    var files = []
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
        // projectIds = authIDs.map(item => ({ item: item, id: require(item).project_id }))
        // console.log(projectIds)
        // res.render('projects', projectIds)
        // console.log(req)
        //  const file = require(`./${req.url.split('upload=')[1].substr(0,req.url.split('=')[1].length-5)}`)
        // const file = require(req.query.upload)
        // console.log(req)

        // // // console.log('======================', `./${req.url.split('=')[1]}`)
        // const auth = new google.auth.JWT(
        //     file.client_email,
        //     null,
        //     file.private_key,
        //     ['https://www.googleapis.com/auth/dialogflow']
        // );
        // dialogflow.projects.agent.entityTypes.list({
        //     auth: auth,
        //     parent: `projects/${file.project_id}/agent`
        // }).then(item =>
        //     responses.push(item)
        // )
        // // console.log(authIDs) 

        // // authIDs.push(`./${req.url.split('=')[1]}`) 
        // names.push(req.parameter)
        // for (let i = 0; i < names; i++) {
        //     df.push([names[i], [responses]])
        // }   
// console.log( df, files)
// if(responses[0] ){
// console.log(responses[0][0][0][0].messages)
// }
      await  res.render('projects', { df, files, param, parameter,responses })
        // console.log(auth)

    });

    app.get('/add', async (req, res) => {
    
            const route = req.query.upload.split('&')[0]
         files.push(require(`/${route}`))
        // console.log(file)

        // // console.log('======================', `./${req.url.split('=')[1]}`)
        // const auth = new google.auth.JWT(
        //     file.client_email,
        //     null,
        //     file.private_key,
        //     ['https://www.googleapis.com/auth/dialogflow']
        // );
        // dialogflow.projects.agent.entityTypes.list({
        //     auth: auth,
        //     parent: `projects/${file.project_id}/agent`
        // }).then(item =>
        //     responses.push(item)
        // )
        console.log(authIDs) 

        // authIDs.push(`./${req.url.split('=')[1]}`) 
    
    


        //  var DFS = files.filter(i => i != '' && i != '&')

        // var DFSFiles = authIDs.filter(item => DFS.map(project => item.includes(project) ))

        //  var DFSFilesRoutes = DFSFiles.map(item => require(item))
        // console.log(DFSFilesRoutes[0])
        // console.log('.............................', DFSFiles )
        // var projectIds = req.query.projects
        // console.log(projectIds)
        var finalResult = []


        // console.log(projectIds)
        // console.log(authIDs, projectIds) 
    
        // var url_parts = url.parse(req.url, true);
        // var query = url_parts.query;
        // console.log(query)
          const dialogflow1 = require('dialogflow');
 
    // console.log()
    
    
        // console.log()
          
        for (let i = 0; i < files.length;i++){
            
        //   ids.push(DFSFilesRoutes[i])
       
        //   console.log(DFSFilesRoutes[1].project_id)

          console.log('======================================================================')
          const clientIntents = new dialogflow1.v2.IntentsClient(

              { credentials:files[i] }
          );
          const clientEntites = new dialogflow1.v2.EntityTypesClient(

              { credentials: files[i] }    
          );

          const agentPathIntent = clientIntents.projectAgentPath(`${files[i].project_id}`);
       const agentPathEntity = clientEntites.projectAgentPath(`${files[i].project_id}`);

    
          clientIntents.listIntents({ parent: agentPathIntent})
              .then(responses => {
                   intentsArr.push(responses[0]);
                console.log('Intents:');
                })
              .catch(err => {
                  console.error('Failed to list intents:', err);
              });

                

          clientEntites.listEntityTypes({ parent: agentPathEntity})
              .then(responses => {
                  entitiesArr.push(responses[0]);
                console.log('entities:');
                
                    
              }).catch(err => {
                  console.error('Failed to list intents:', err);
              });

        //   console.log(searchParameter.replace(/[+]/g, ' '))

        //   console.log(';;;;;;;;;;;;;;;;;;;;;',intents,entities)
        //   var dat = fuzzy.filter(`${searchParameter}`, intentsArr)     

        //   if (req.query.parameters === 'action') {
        //       intentsArr.map( i => i.filter(item => item.action === searchParameter.replace(/[+]/g, ' ')))
        //       entitiesArr.map(i => i.filter(item => item.action === searchParameter.replace(/[+]/g, ' '))) 

        //   }
        //   else if (req.query.parameters === 'name') {
            

        //       intentsArr.map(i => i.filter(item => item.name === searchParameter.replace(/[+]/g, ' ')))
        //       entitiesArr.map(i => i.filter(item => item.name === searchParameter.replace(/[+]/g, ' '))) 
        //   }
        //   else {
        //       intentsArr.map(i => i.filter(item => item.displayName === searchParameter.replace(/[+]/g, ' ')))
        //       entitiesArr.map(i => i.filter(item => item.displayName === searchParameter.replace(/[+]/g, ' '))) 
        //     result2= entitiesArr.filter(item => item.displayName === searchParameter.replace(/[+]/g, ' '))
        //   }
            responses.push([intentsArr, entitiesArr])
         
            }
 console.log(responses.push([intentsArr, entitiesArr]))
            // names.push(req.query.parameter)
            df.push(req.query.df)
            // data.push(finalResult)
        // files.push(file)
        // res.redirect('/')
     console.log( responses)
            //  console.log('====================')
        res.redirect('/')


    })


    // app.get('/add',  async (req, res) => {

    

    // })

    app.get('/compare', async (req, res) => {
        // const file =`${req.query.parameters}`

        
         var searchParameter = req.url.split('parameters=')[1];
        // console.log(searchParameter)
      


    //   console.log(finalResult.map(i => i.flat(10).filter(a => a.length > 0)))
        // console.log(encodeURIComponent(searchParameter))
        // const filterd = Object.entries(intents).map(item => ite==)
        
        //  console.log('111111111111111111', intentsArr.filter(item => item.displayName === searchParameter.replace(/[+]/g, ' ')  ))

        // let extractedString = myString.substring(startIndex, endIndex);
    //  data.push(result)
    //     data.push(result2)

        // console.log('cccccccccccccccccccccc', intentsArr)
    
        //  var finnal = [result, result2]
        // var finnal = result

    //    const finalIntents =  finalResult[0].map( i=> i.filter(a => a.length > 0))
    //     const finalEntites = finalResult[1].map(i => i.filter(a => a.length > 0))      
        // finalResulta = [finalIntents, finalEntites]
        // console.log(finalResult)

         const uu = searchParameter.split('.')


        // // data = finalResulta
        // // console.log('=============',data.map(i =>  i)[0].m    ap(i4=> i4).flat(10))
        // // console.log(entitiesArr,intentsArr)
        // param.push(uu)
        //  parameter.push(searchParameter.replace(/(%3D)/g, '='))
        console.log(uu)
        parameter.push(searchParameter.split('.'))
         console.log()
         console.log(parameter)
        // console.log('-------',responses[0][0].map(item =>{return  item.filter(item => item[param] === param.split('=')[1])}), param)



    //     console.log(uu[0].uu[1].uu[2])
        // res.render('DataTables', { finalResulta, projectIds });
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
        res.redirect('/');
            
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


    // app.get(/customzie/ , async (req, res) => {

    //     console.log(req.path.split('/')[2])
    //     // Get the updated entities and intents from the request body
    //     const { entity } = req.query;
    //     const { intent} = req.query;

    //     console.log(intent, entity)
    //     const intentsClient = await dialogflow.projects.agent.intents
    //     console.log(intentsClient)
    //     const entitiesClient = await dialogflow.projects.agent.entityTypes

    //     // Create the request
    //     const request = {
    //         name: `projects/${projectId}/agent/`,
    //         requestBody: {
    //                    // request body parameters
                    
    //                   "autoExpansionMode": "my_autoExpansionMode",
    //                   "displayName": "my_displayName",
    //                   "enableFuzzyExtraction": false,
    //                   "entities": [],
    //                   "kind": "my_kind",
    //                   "name": "my_name"
                    
    //               },
    //     };
    //     const request2 = {
    //         name: `projects/${projectId}/agent`,
    //         intents: { entity: entity }
    //     };


    //     if (intent) {
    //     intentsClient
    //         .patch(request)
    //         // .then(responses => {
    //         //     console.log(`Intents updated: ${responses[0]}`);
    //         //     const getIntentRequest = { name: responses[0] };
    //         //     // Call the getIntent method
    //         //     console.log('==============================================================================================', intentsClient.getIntent(getIntentRequest));
    //         // })
    //         // .catch(err => {
    //         //     console.error(`Error updating intents: ${err}`);
    //         // });
    //     }
    //     if (entity){
    //     entitiesClient
    //         .patch(request2)
    //         // .then(responses => {
    //         //     console.log(`Intents updated: ${responses[0]}`);
    //         //     const getIntentRequest = { name: responses[0] };
    //         //     // Call the getIntent method
    //         //     console.log('==============================================================================================', intentsClient.getIntent(getIntentRequest));
    //         // })
    //         // .catch(err => {
    //         //     console.error(`Error updating intents: ${err}`);
    //         // });

    //     }
    //         res.redirect('/')
    // });
    app.get('/copy', async (req, res) => {

    
        const data = fs.readFileSync(`./${req.query.upload}`, 'utf-8');
        const jsonData = JSON.parse(data);

        for (let i = 0; i < req.query.uploadArr;i++){
            fs.writeFileSync(`./${req.query.uploadArr[i]}`, JSON.stringify(jsonData));
        }
    await res.redirect('/')
    })
    app.listen(3000, () => {
        console.log('Server started on port 3000');
    });
