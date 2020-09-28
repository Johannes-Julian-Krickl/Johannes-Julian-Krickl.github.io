//get elements once, no redundant DOM access
const navbar = document.getElementById('navbar');
const navItems = navbar.children;
const footerArrow = document.getElementById('footer-arrow');
const tolerance = 100;
var pages = getPages();
var pageScrollHeight = getPageScrollHeight();   //starting height of each page(sections) first not included
var footerChangeHeight = 100;

var enabledPageFooter = 1; //page nr of the enabled header
var enabledPageHeader = 1; //page nr of the enabled header

//content slide box page 2
const experience_cards =  document.getElementsByClassName("p2-card");
//page 2
const indicators = document.getElementById('project-indicator').children;


//p3 mobile entries
const p3_timeline_entries =  document.getElementsByClassName("p3-entry");

const p3_year_selector = document.getElementById('p3_year_selector');

//page 4 Insights
const insights = document.getElementsByClassName("p4-insight");
const insights_indicators = document.getElementById('insights-indicators').children;

//retreive sections from document
function getPages() {
  let pages = [...document.getElementsByTagName("section")];
  let removePage = -1; //for removing not displayed sections
  for (var i = 1; i < pages.length; i++) {
    if(pages[i].offsetHeight == 0) {
      removePage = i;
    }
  }
  if (removePage != -1) {
    pages.splice(removePage , 1);
  }
  return pages;
}

//compute and returns a list of heights where each page starts
function getPageScrollHeight() {
  let pageScrollHeight = [];

  pageScrollHeight.push(0)
  for (var i = 1; i < pages.length; i++) {
    pageScrollHeight.push(pageScrollHeight[i-1]+pages[i-1].offsetHeight-tolerance); //40px tolerance to change more rapid
  }
  return pageScrollHeight;
}

//on window resized, compute scroll points
window.addEventListener('resize', () => {
  if (pageScrollHeight[1] != pages[1].offsetHeight) {  //if section size actually changed
    pages = getPages();
    pageScrollHeight = getPageScrollHeight();
  }
});

//event listener for changing navbar class, navbar is triggered on top of page
window.addEventListener('scroll', () => {
  if (this.scrollY < pageScrollHeight[1]) {
    toggleNavActive(1);

  } else if (this.scrollY >= pageScrollHeight[1] && this.scrollY < pageScrollHeight[2]) {
    toggleNavActive(2);

  } else if (this.scrollY >= pageScrollHeight[2] && this.scrollY < pageScrollHeight[3]) {
    toggleNavActive(3);

  } else if (this.scrollY >= pageScrollHeight[3] && this.scrollY < pageScrollHeight[4]) {
    toggleNavActive(4);

  } else if (this.scrollY >= pageScrollHeight[4] && this.scrollY < pageScrollHeight[5]) {
    toggleNavActive(5);

  } else if (this.scrollY >= pageScrollHeight[5] && this.scrollY < pageScrollHeight[6]) {
    toggleNavActive(6);

  } else if (this.scrollY >= pageScrollHeight[5]) {
    toggleNavActive(7);
  }

  //toggle navbar on first page
  if (this.scrollY < pageScrollHeight[1]) {
    //navbar.classList.remove('nav-page-other');
    navbar.classList.add('hidden');
    //navItems[0].classList.add('nav-item-active-1');

  } else if (this.scrollY >= pageScrollHeight[1]) {
    navbar.classList.remove('hidden');

    //navItems[0].classList.remove('nav-item-active-1');
  }

  //toggle arrow
  if(this.scrollY < pageScrollHeight[1] || this.scrollY > pageScrollHeight[6]) {
    footerArrow.classList.toggle('hidden', true);

  } else if(this.scrollY >= pageScrollHeight[1] || this.scrollY <= pageScrollHeight[6]) {
    footerArrow.classList.toggle('hidden', false);
  }

});


function toggleNavActive(pageNr) {
  //checks if page even changed, prevents unnecessary computation,
  //leaving more cpu time for other tasks
  if (pageNr != enabledPageHeader) {
    //page changed
    enabledPageHeader = pageNr;
    resetActiveClass();

    if (pageNr != 1) {  // first page has separat active tag
        navItems[pageNr-1].classList.add('nav-item-active');
    }

    if (pageNr === 4) {
      navbar.classList.toggle("nav-insights", true);
      footerArrow.classList.toggle('invisible', true);

    } else {
      if (navbar.classList.contains("nav-insights")) {
          navbar.classList.remove("nav-insights");
          footerArrow.classList.remove('invisible');
      }
    }

  }
}

function resetActiveClass() {
  for (var i = 0; i < navItems.length; i++) {
    navItems[i].classList.remove('nav-item-active')
  }
}



function cycleProject(forwards) {
  active = findActiveProject();
  direction = forwards ? 1:-1;
  newActive = (active+direction+experience_cards.length) % experience_cards.length;
  //disable old
  experience_cards[active].classList.add('hidden');
  indicators[active].classList.remove('active-indicator');

  //enable new
  experience_cards[newActive].classList.remove('hidden');
  indicators[newActive].classList.add('active-indicator');

  document.getElementById('page2').scrollIntoView();
}

function findActiveProject() {
  for (var i = 0; i < experience_cards.length; i++) {
    if(!experience_cards[i].classList.contains('hidden'))
    return i;
  }
}

function cycleInsight(forwards) {
  active = findActiveInsight();
  direction = forwards ? 1:-1;
  newActive = (active+direction+insights.length) % insights.length;
  //disable old
  insights[active].classList.add('hidden');
  insights_indicators[active].classList.remove('active-indicator');

  //enable new
  insights[newActive].classList.remove('hidden');
  insights_indicators[newActive].classList.add('active-indicator');

  document.getElementById('page4').scrollIntoView();
}

function findActiveInsight() {
  for (var i = 0; i < insights.length; i++) {
    if(!insights[i].classList.contains('hidden'))
    return i;
  }
}


function page3Activate(entry, from, until) {
  if (window.innerWidth <= 800) {
    resetTimeline();

    p3_timeline_entries[entry-1].classList.add("p3-entry-selected");

    p3_year_selector.style.cssText = "grid-column: "+ from + ' / '+until+" !important;";
  }
}

function resetTimeline() {
  for (var i = 0; i < p3_timeline_entries.length; i++) {
    p3_timeline_entries[i].classList.remove("p3-entry-selected");
  }
}
