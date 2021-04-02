/*
Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.

Licensed under the Apache License, Version 2.0 (the "License").
You may not use this file except in compliance with the License.
You may obtain a copy of the License at
    http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
import { API, Auth } from 'aws-amplify';

const apiName = "MyAPIGatewayAPI";

// API Class centralizing call to cloud services
class Api {

    static async fetchItems()  {

        return await API.get(apiName, "/")
            .catch(error => {
                console.log(error.response);
            });
    }

    static async fetchItemsProfile(profileID) {
        
        const username = (await (await Auth.currentSession()).getIdToken()).payload.name;
        
        return await API.get(apiName, "/users/" + username)
            .catch(error => {
                console.log(error.response);
            });
    }

    static async likeItem(post, user) {

        const data = await API.put(apiName, "/like", { 
            body: { user: user, post: post},
        })
        .catch(error => {
            console.log(error.response);
        });

        return data.Attributes.likes;
    }

    static async dislikeItem(post, user) {
        
        const data = await API.put(apiName, "/dislike", { 
            body: { user: user, post: post},
        })
        .catch(error => {
            console.log(error.response);
        });

        return data.Attributes.likes;
    }

    static async preparePost() {

        const username = (await (await Auth.currentSession()).getIdToken()).payload.name;
        
        console.log(username);
        return await API.put(apiName, "/preparepost", {
            body: { user: username }
        })    
        .catch(error => {
            console.log(error.response);
        });
    }

    static async uploadFile(file) {

        // get the presigned url 
        const signedRequestResp = await this.preparePost();

        // Send the file with due headers for signed request - using RN fetch because URL can be virtually anything
        return await fetch(signedRequestResp.url, {
            method: "PUT",
            body: file,
            header: {
                'x-amz-meta-userid': signedRequestResp.userid,
                'x-amz-meta-postid': signedRequestResp.postid,
                'x-amz-meta-createdat': signedRequestResp.createdat,
                'x-amz-meta-ownername': signedRequestResp.ownername
            }
        }).then(data => { 
            return 1;
        })
        .catch(err => { 
            console.log(err); 
            return -1; 
        });

    }
}

export default Api;