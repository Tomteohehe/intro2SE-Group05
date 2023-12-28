import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Layout from "../components/layout/Layout";
import HomeBanner from "../module/home/HomeBanner";
import HomeFeature from "../module/home/HomeFeature";


const ContactPageStyles = styled.div`
.founders-container {
    display: flex;
    flex-wrap: center; 
    overflow-x: auto;
    justify-content: center;
    margin-bottom: 20px;
  }
  
  .founder-card {
    flex-wrap: center;
    width: 300px; 
    margin-right: 20px; 
    padding: 20px;
    border: 2px solid #ccc;
    border-radius: 8px;
    border-color: green ;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
.Branding {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100px;
    color: #1DC071;
    &-content{
        width: min(500px, 60vw);
        display: flex;
        flex-direction: column;
        color: white;
        margin-right: min(4em, 7vw);

  h1 {
    font-size: calc(1em + 1vw);
    font-weight: 600;
    color: #1DC071;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    
  }
  p {
    font-size: min(1em, 1.5vw);
    color: black;
    line-height: min(20px, 2vw);
    justify-content: center;
    align-items: center;
    text-align: center;
  }
}
}
.founder-card h3,
.founder-card p {
text-align: center;

`

const founderData =[
{
    name: 'Huynh Vinh Do',
    id: '21127571',
    bio:'',
    email: '',
    position:'Coach',
    avatar:'',
},
{
    name:'Hoang Tran Thong',
    id: '21127695',
    bio:'description',
    email: '',
    position:'Tien Dao',
    avatar:'',
},
{
    name: 'Tran Cong Bao',
    id: '21127737',
    bio: 'No man has the right to be an amateur in the matter of physical training. It is a shame for a man to grow old without seeing the beauty and strength of which his body is capable',
    email: 'tran.conggbaoo@gmail.com',
    position:'Thu Mon',
    avatar:'',
},
{
    name: 'Pham Huynh Tan Dat',
    id: '21127594',
    bio: '',
    email: '',
    position:'Hau Ve',
    avatar: '',

}
]


const ContactPage = () => {
    return(
        <ContactPageStyles>
        <Layout>
       <div>
        <div className="Branding">
        <div className="Branding-content">
            <h1>The GoaTalks's Team</h1>
        </div>
        </div>
        <div className="Branding">
            <div className="Branding-content">
                <p>
                    It's not over until we win!!!
                </p>
            </div>
        </div>
        <div className="founders-container">
            {founderData.map((founder) => (
                <div key = {founder.id} className="founder-card">
                    <img src = {founder.avatar} alt = {founder.name} className="founder-avatar"/>
                    <h3>{founder.name}</h3>
                    <p>{founder.position}</p>
                    <p>{founder.email}</p>
                    <p>Bio: {founder.bio}</p>

                </div>
            ))}
        </div>
        
       </div>
       </Layout>  
       </ContactPageStyles>
    );
};

export default ContactPage;