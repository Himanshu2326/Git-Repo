
/*
===============================
? JavaScript
===============================
*/



//* ===========> User Basic Input <=============
let InputValue = document.querySelector("#search");
let searchBtn = document.querySelector("#searchBtn");
let UserImage = document.querySelector("#UserImage");
let Location = document.querySelector("#Location");
let Name = document.querySelector("#Name");
let Bio = document.querySelector("#Bio");
let Link = document.querySelector("#Link");



//* ===========> User Repo Input <==============
let RepoCont = document.querySelector('.RepoCont');
let DividerName = document.querySelector('.DividerName');



//? ===========> Api Fetching <===================
const FetchRepo = async () => {

    //* Loader ON
    let loader = document.querySelector('.loading');
    loader.style.display = 'block'

    //* =======> Deleting Previous Created Repo Element 
    let Repo = Array.from(document.getElementsByClassName('Repo'))
    Repo.forEach((e) => {
        e.remove();
    })

    //* =======> Deleting Previous Created Pagination Button  
    let Buttons = Array.from(document.getElementsByTagName('button'));
    Buttons.forEach((e) => {
        e.remove()
    })

    //* =======> Try Block 
    try {

        //? ===> Main Fetch Url 

        let Url = `https://api.github.com/users/${InputValue.value}`;
        let Data = await fetch(Url);
        let JsonData = await Data.json();


        //? ====> Repositories Url 
        let RepoUrl = JsonData.repos_url;
        let RepoData = await fetch(RepoUrl);
        let RepoJsonData = await RepoData.json();


        //* =======> Divider <==========
        DividerName.innerHTML = `Repositories(${RepoJsonData.length})`


        //* =======> User Basic Info And Image Part <======
        UserImage.src = JsonData.avatar_url;          // Image
        Location.innerHTML = JsonData.location;       // Location
        Name.innerHTML = JsonData.name;               // Name                    
        Bio.innerHTML = JsonData.bio;                 // Bio 
        Link.innerHTML = JsonData.blog;               // Link
        Link.setAttribute("href", JsonData.blog);



        //? =========> Pagination Button <===========
        let footer = document.querySelector('.footer');
        let footerDiv = document.createElement('div');
        footerDiv.setAttribute('class', 'footdiv')

        footer.appendChild(footerDiv);

        let btnCount = RepoJsonData.length / 10;

        if (btnCount.toString().indexOf(".") != -1) {
            btnCount = Math.floor(btnCount + 1)
        }

        //* ===> PRE BUTTON 
        footerDiv.innerHTML += `<button class="Prebtn" onclick = "pre()" >Pre</button>`;

        for (let i = 1; i <= btnCount; i++) {
            footerDiv.innerHTML += `<button class="btn button active"  >${i}</button>`;
        }
        //* ===> NEXT BUTTON 
        footerDiv.innerHTML += `<button class="Nextbtn" onclick = "next()" >Next</button>`;



        //* ======> Page Change Button Events 

        let Buttons = Array.from(document.getElementsByTagName('button'));
        let PreBtn = document.querySelector('.Prebtn');


        let start = 0;
        let limit = 10;
        let page = 1;

        limit = page * limit;
        start = limit - 10;


        //* ----- Pre Disabled -------
        if (page == 1) {
            PreBtn.disabled = true;
        }
        else {
            PreBtn.disabled = false;
        }

        for (let i = page + 1; i <= btnCount; i++) {
            Buttons[i].classList.remove('active')
        }



        RepoJsonData = Array.from(RepoJsonData).slice(start, limit);


        //? =========> Creating Repositories  <==========
        for (let i = 0; i <= RepoJsonData.length - 1; i++) {

            //* =====> Main Div 
            var RepoDiv = document.createElement('div');
            RepoDiv.setAttribute('class', 'Repo')
            RepoCont.appendChild(RepoDiv);

            //* =====> Repo Name Tag H1
            let RepoNameH1 = document.createElement('h1');
            RepoDiv.appendChild(RepoNameH1);

            //* =====> Repo Name With Link Tag a 
            let a_RepoName = document.createElement('a');
            a_RepoName.setAttribute('href', `${RepoJsonData[i].html_url}`)
            a_RepoName.setAttribute('class', "RepoName");
            RepoNameH1.appendChild(a_RepoName);

            //* =====> Repo Discription
            let P_RepoDiscription = document.createElement('p');
            P_RepoDiscription.setAttribute("class", "RepoDiscription")
            RepoDiv.appendChild(P_RepoDiscription);

            //* =====> Repo Language
            let RepoLang = document.createElement('span');
            RepoLang.setAttribute("class", "RepoLanguage")
            RepoDiv.appendChild(RepoLang);

            let RepoName = document.querySelectorAll('.RepoName');
            let RepoDiscription = document.querySelectorAll('.RepoDiscription');
            let RepoLanguage = document.querySelectorAll('.RepoLanguage');

            //* =====> User Repositories
            RepoName[i].innerHTML = RepoJsonData[i].name;
            RepoDiscription[i].innerHTML = RepoJsonData[i].description;
            RepoLanguage[i].innerHTML = RepoJsonData[i].language;

        }

        //* Loader OFF
        loader.style.display = 'none';


    } catch (error) {
        console.log(error);
        loader.style.display = 'none';
        InputValue.value = ""
        InputValue.placeholder = "Invalid Username";
          
        Location.innerHTML = 'Location'    
        Name.innerHTML = 'Invalid Username'                          
        Bio.innerHTML = 'Bio'          
        Link.innerHTML = 'Link';       

    }


}
    //* =========> Api Calling <=============
    searchBtn.addEventListener('click', FetchRepo)

    InputValue.addEventListener('keydown', (e) => {
        if (e.code == "Enter") {
            FetchRepo();
        }
    })


    //* Body On Load, Loader Off
    const showLoader = () => {
        let loader = document.querySelector('.loading');

        loader.style.display = 'none';
    }

