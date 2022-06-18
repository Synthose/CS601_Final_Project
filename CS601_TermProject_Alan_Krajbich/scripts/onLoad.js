document.addEventListener("DOMContentLoaded",function () {
    const navBar = document.querySelectorAll("nav");
    navBar.forEach(element => {
        element.innerHTML = "<a href=\"home.html\">Main</a> | <a href=\"blog.html\">Blog</a> | <a href=\"faqs.html\">FAQs</a> | <a href=\"aboutMe.html\">About me </a> |<a href=\"contact.html\">Contact Me</a> "
    });
})