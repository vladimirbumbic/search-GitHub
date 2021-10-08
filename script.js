const body = document.querySelector('body');
const theme = document.querySelector('.theme');
const spanError = document.querySelector('.hidden');
const input = document.getElementById('username');
const avatar = document.getElementById('profilePic');
const userName = document.getElementById('name');
const userJoined = document.getElementById('joined');
const githubusername = document.getElementById('githubUsername');
const userBio = document.getElementById('bio');
const userRepo = document.getElementById('repo');
const userFollowers = document.getElementById('followers');
const userFollowing = document.getElementById('following');

theme.addEventListener('click', () => {
    body.classList.toggle('dark');
});

function submitForm(e) {
    e.preventDefault();

    fetchUser(input.value);
}

async function fetchUser(username) {
    spanError.classList.add('hidden');

    try {
        const response = await fetch(
            `https://api.github.com/users/${username}`
        );
        const parsedResponse = await response.json();

        if (!response.ok) {
            return spanError.classList.remove('hidden');
        }

        return updateDOM(parsedResponse);
    } catch (err) {
        return console.log(err);
    }
}

function updateDOM(user) {
    const joinedAt = user.created_at.split('T')[0];
    const parsedJoinedAt = joinedAt.split('-');

    const year = parsedJoinedAt[0];
    const month = parsedJoinedAt[1];
    const day = parsedJoinedAt[2];

    const date = new Date(year, month, day);
    date.setMonth(month - 1);

    const monthShort = date.toLocaleString('en', { month: 'short' });

    userJoined.dateTime = joinedAt;
    userJoined.innerHTML = `Joined ${day} ${monthShort} ${year}`;

    avatar.src = user.avatar_url;

    if (user.name === null) {
        userName.innerHTML = user.login;
    } else {
        userName.innerHTML = user.name;
    }
    githubusername.innerHTML = `@${user.login}`;

    if (user.bio === null) {
        userBio.innerHTML = 'This profile has no bio';
        userBio.style.opacity = '0.7';
    } else {
        userBio.innerHTML = user.bio;
    }

    userRepo.innerHTML = user.public_repos;
    userFollowers.innerHTML = user.followers;
    userFollowing.innerHTML = user.following;

    if (user.location === null) {
        document.getElementById('place').innerHTML = 'Not Available';
        document.getElementById('place').style.opacity = '0.5';
        document.getElementById('loc').style.opacity = '0.5';
    } else {
        document.getElementById('place').innerHTML = user.location;
        document.getElementById('place').style.opacity = '1';
        document.getElementById('loc').style.opacity = '1';
    }

    if (user.blog === '') {
        document.getElementById('cite').innerHTML = 'Not Available';
        document.getElementById('cite').style.opacity = '0.5';
        document.getElementById('cite').removeAttribute('href');
        document.getElementById('web').style.opacity = '0.5';
    } else {
        document.getElementById('cite').setAttribute('href', user.blog);
        document.getElementById('cite').innerHTML = user.blog;
        document.getElementById('cite').style.opacity = '1';
        document.getElementById('web').style.opacity = '1';
    }

    if (user.twitter_username === null) {
        document.getElementById('tw').innerHTML = 'Not Available';
        document.getElementById('tw').style.opacity = '0.5';
        document.getElementById('tw').removeAttribute('href');
        document.getElementById('tweet').style.opacity = '0.5';
    } else {
        document
            .getElementById('tw')
            .setAttribute(
                'href',
                `https://twitter.com/${user.twitter_username}`
            );
        document.getElementById('tw').innerHTML = user.twitter_username;
        document.getElementById('tw').style.opacity = '1';
        document.getElementById('tweet').style.opacity = '1';
    }

    if (user.company === null) {
        document.getElementById('firm').innerHTML = 'Not Available';
        document.getElementById('firm').style.opacity = '0.5';
        document.getElementById('firm').removeAttribute('href');
        document.getElementById('comp').style.opacity = '0.5';
    } else {
        document
            .getElementById('firm')
            .setAttribute(
                'href',
                `https://github.com/${user.company.replace('@', '')}`
            );
        document.getElementById('firm').innerHTML = user.company;
        document.getElementById('firm').style.opacity = '1';
        document.getElementById('comp').style.opacity = '1';
    }
}

fetchUser('octocat');
