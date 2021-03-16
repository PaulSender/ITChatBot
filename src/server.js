const express = require('express')
var bodyParser = require('body-parser')

const app = express()
const AssistantV2 = require('ibm-watson/assistant/v2');
const { IamAuthenticator } = require('ibm-watson/auth');
const cors = require('cors')

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.post('/', async function (req, res) {
    console.log(req.body);
    // Here's how you get the data from the front-end.
    var messages = req.body
    // init assistant
    const assistant = new AssistantV2({
        version: '2020-04-01',
        authenticator: new IamAuthenticator({
            apikey: 'tuG9mC6jBr9nSf5DVhHqoB22kDtnUOmTkuRbpaDBuCng',
        }),
        serviceUrl: 'https://nam04.safelinks.protection.outlook.com/?url=https%3A%2F%2Fapi.us-south.assistant.watson.cloud.ibm.com%2Finstances%2F384648db-6aed-4ceb-871b-321b292ff899%2Fv2%2Fassistants%2F398fd1c8-a06f-4fdc-b9f1-c553d1878907%2Fsessions&data=04%7C01%7Chinchliffen%40wit.edu%7C919be49ca3d540fef69c08d8e8bf6c79%7C2af16cc576494528bc4d3d9b6f64c066%7C0%7C0%7C637515256161538442%7CUnknown%7CTWFpbGZsb3d8eyJWIjoiMC4wLjAwMDAiLCJQIjoiV2luMzIiLCJBTiI6Ik1haWwiLCJXVCI6Mn0%3D%7C1000&sdata=kYdX2F1BoOovTpVbwO1ABQ2vg8fpppeKO7%2BmIxCMvLY%3D&reserved=0',
    });
    // get result from starting assistant service
    var watsonResponse = await assistant.createSession({ assistantId: '398fd1c8-a06f-4fdc-b9f1-c553d1878907' })

    if (watsonResponse.includes("Some Error Message")) {
        // console.error(watsonResponse);
        res.status(400).send("BAD")
    }
    // If all goes well...
    else {
        // Run some type of watson method to parse your message data
        var x = await assistant.message(messages)
        // Send that response back to the front-end
        res.status(200).send(x)
    }
})

app.listen(3001)