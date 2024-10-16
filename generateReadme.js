const fs = require('fs');
const axios = require('axios');

const GITHUB_USERNAME = 'caydendev';
const GITHUB_API_URL = `https://api.github.com/users/${GITHUB_USERNAME}`;

async function fetchGitHubData() {
    const { data } = await axios.get(GITHUB_API_URL);
    return {
        username: data.login,
        bio: data.bio || 'No bio available.',
        publicRepos: data.public_repos,
        followers: data.followers,
        following: data.following,
        avatarUrl: data.avatar_url,
        htmlUrl: data.html_url,
    };
}

async function generateReadme() {
    const githubData = await fetchGitHubData();
    
    const readmeTemplate = `
# 👋 Hello, I'm ${githubData.username}!

Welcome to my GitHub profile! I'm a passionate who's exploring new technologies and building some solutions. This is a showcase of my skills, projects, and contributions.

[![Typing SVG](https://readme-typing-svg.demolab.com?font=Fira+Code&pause=1000&width=435&lines=Go+touch+some+grass)](https://git.io/typing-svg)

## 🔧 Technologies & Languages

![Python](https://img.shields.io/badge/Python-3776AB?style=flat&logo=python&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![Java](https://img.shields.io/badge/Java-007396?style=flat&logo=java&logoColor=white)

![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=caydendev&langs_count=10)

## 📊 GitHub Stats

![${githubData.username}'s GitHub Stats](https://github-readme-stats.vercel.app/api?username=${githubData.username}&show_icons=true&theme=radical)

## 🔗 My Repositories

- [This Readme](https://github.com/${githubData.username/CaydenDev}) 
- [Organisation: DieAtzen](https://github.com/DieAtzen)

## 📫 Connect with Me:
- atzen@post.com

---

## 📊 Additional GitHub Statistics

- 🌟 **Public Repositories:** ${githubData.publicRepos}  
- 👥 **Followers:** ${githubData.followers}  
- 🔗 **GitHub Profile:** [Visit My Profile](https://github.com/${githubData.username})

![GitHub Stats Contribution](https://github-readme-streak-stats.herokuapp.com/?user=${githubData.username}&theme=radical)
    `;

    fs.writeFileSync('README.md', readmeTemplate.trim());
    console.log('README.md has been updated.');
}

generateReadme().catch(error => {
    console.error('Error generating README:', error);
});
