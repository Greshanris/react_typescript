import { useEffect, useState } from 'react';
import './App.css'

function App() {
  
  const [followers, setFollowers] = useState<number>(0)
  
  useEffect(() => {
    fetch("https://api.github.com/users/Greshanris", { method: "GET" })
    .then((res) => res.json())
    .then((data: unknown)=>{
      // if we are fetching data from a network, throught any method: GET, PUT, POST, PATCH
      // it is recommended to put data type as unknown as we do not know anything about it.

      // Then, we can use like this below code:

      //----------code----------------
      // if (typeof data === "object" && data != null && "followers" in data) {
      //   setFollowers(data.followers)
      // }

      // OR, we can use like this by defining a custom type manually like this:

      type GithubUser = {
        login: string;
        id: number;
        node_id: string;
        avatar_url: string;
        gravatar_id: string;
        url: string;
        html_url: string;
        followers_url: string;
        following_url: string;
        gists_url: string;
        starred_url: string;
        subscriptions_url: string;
        organizations_url: string;
        repos_url: string;
        events_url: string;
        received_events_url: string;
        type: string;
        user_view_type: string;
        site_admin: boolean;
        name: string;
        company: string | null;
        blog: string;
        location: string;
        email: string | null;
        hireable: boolean | null;
        bio: string;
        twitter_username: string | null;
        public_repos: number;
        public_gists: number;
        followers: number;
        following: number;
        created_at: string;
        updated_at: string;
      }

      const githubUser = data as GithubUser; // use type assertion

      setFollowers(githubUser.followers)
    })


    // OR, we can use third party validators like YUP, classValidator, ZOD

    /*
    How can we use Yup?
    - Create a userSchema on how objects may be coming like this:

      let userSchema = object({
      name: string().required(),
      age: number().required().positive().integer(),
      email: string().email(),
      website: string().url().nullable(),
      createdOn: date().default( () => new Date())
      })

    - Then, we parse, an assert validity
      
      const user = await userSchema.validate(await fetchUser());

    type User = InferType<typeof userSchema>;
    */

  })

  return <>
  <div className=''>
    Rishav's followers:
    <div>{followers}</div>
  </div>
  </>;
}

export default App
