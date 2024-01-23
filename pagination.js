


//? =============>  PAGINATION <===================== 


//* ====> PRE BUTTON <====
const pre = () => {

    let Buttons = Array.from(document.getElementsByClassName('button'));

    let Index = 0;
    Buttons.forEach((btn, i) => {
        if (btn.classList.contains('active')) {
            Index = i;
        }
    })
    setTimeout(() => {
        Buttons[Index - 1].click();
    }, 0);
}



//* ====> NEXT BUTTON <====
function next() {

    let Buttons = Array.from(document.getElementsByClassName('button'));

    let Index = 0;
    Buttons.forEach((btn, i) => {
        if (btn.classList.contains('active')) {
            Index = i;
        }
        setTimeout(() => {

            Buttons[Index + 1].click();
        }, 0);
    })

}



//* ====> GET PAGE BUTTON <====
const getPage = () => {

    let NextBtn = document.querySelector('.Nextbtn');
    let InputValue = document.querySelector("#search");
    let Buttons = Array.from(document.getElementsByTagName('button'));
    let PreBtn = document.querySelector('.Prebtn');

    Buttons.forEach((e) => {

        e.addEventListener('click', async () => {
            let Url = `https://api.github.com/users/${InputValue.value}`;
            let Data = await fetch(Url);
            let JsonData = await Data.json();

            let RepoUrl = JsonData.repos_url;
            let RepoData = await fetch(RepoUrl);
            let RepoJsonData = await RepoData.json();



            //* Adding And Removing Active Class:--- 
            let btnCount = RepoJsonData.length / 10;
            if (btnCount.toString().indexOf(".") != -1) {
                btnCount = Math.floor(btnCount + 1)
            }

            for (let i = 0; i <= btnCount; i++) {
                Buttons[i].classList.remove('active')
            }
            if (!e.classList.contains('Nextbtn') && !e.classList.contains('Prebtn')) {
                e.classList.add('active');
            }


            //* REPO According To Page 
            let start = 0;
            let limit = 10;
            curPage = e.innerHTML;
            let page = curPage;
            limit = page * limit;
            start = limit - 10;

            //? Disabling The PRE And NEXT Button 

            //* ----- Pre Disabled -------
            if (page == 1) {
                PreBtn.disabled = true;
            }
            else {
                PreBtn.disabled = false;
            }

            //* ----- Next Disabled -------
            if (page == btnCount) {
                NextBtn.disabled = true;
            }
            else {
                NextBtn.disabled = false;
            }


            //* Removing Previous Repos:-- 
            let Repo = Array.from(document.getElementsByClassName('Repo'))
            Repo.forEach((e) => {
                e.remove();
            })

            RepoJsonData = Array.from(RepoJsonData).slice(start, limit);

            //? =========> Creating Repositories  <==========
            function createRepo() {
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

            }
            createRepo(RepoJsonData)

        })
    })

}




