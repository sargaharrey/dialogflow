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


    var dialogflow1 = require('dialogflow');
  
    var responses = []
    var projects = []
  
    const projectId = 'oversoft-35450';
    var parameter  = []
    var files = []
   
    app.get('/', async (req, res) => {
      console.log(responses)
      await  res.render('projects', { df, files, param, parameter,responses })
        // console.log(auth)

    });
   
    app.get('/page2', async (req, res) => {
      console.log(responses)
      await  res.render('copy')
        // console.log(auth)

    });
app.get('/delete', async (req, res) => {
    console.log(req.query.index)
    
     files.splice(req.query.index, 1)
      await  res.redirect('/')
        // console.log(auth)

    })
    app.get('/add', async (req, res) => {
    
            const route = req.query.upload.split('&')[0]
         files.push(require(`./${route}`))
        // console.log(file)

        var finalResult = []


       
          
        for (let i = 0; i < files.length;i++){
       
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
      



         const uu = searchParameter.split('.')


      
        console.log(uu)
        parameter.push(searchParameter.split('.'))
         console.log()
         console.log(parameter)
      
        res.redirect('/');
            
    });


   
    app.get('/copy', async (req, res) => {

    
        const data = fs.readFileSync(`./${req.query.upload}`, 'utf-8');
        const jsonData = JSON.parse(data);

        for (let i = 0; i < req.query.uploadArr;i++){
            fs.writeFileSync(`./${req.query.uploadArr[i]}`, JSON.stringify(jsonData));
        }
    await res.redirect('page2')
    })
    app.listen(3000, () => {
        console.log('Server started on port 3000');
    });
