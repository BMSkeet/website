/* ===================== SITE SETTINGS — EDIT HERE ===================== */

/* Current league. Change this one line and both hero buttons update.
   Fall 2026 button    ->  fall2026.html
   Reserves button     ->  fall2026_reserves.html          */
var CURRENT_LEAGUE = "Fall 2026";

/* Past Leagues menu. One line per year, newest first.
   To add a league, add its name to that year's list.
   To add a year, copy a line and put it at the top.
   Each name links to past-leagues/<name><year>/<name><year>.html, e.g. past-leagues/spring2026/spring2026.html */
var PAST_LEAGUES = [
  [2026, ["Summer"]]
];

/* Link shown at the bottom of the Past Leagues menu for the older leagues (2018-2025).
   Set to null to hide it. The file is looked up in the main folder. */
var LEGACY_LINK = { label: "Legacy BMS Homepage", href: "https://www.bluemondayskeet.org/" };

/* Announcements strip (shown under the banner on the home page).
   One line per announcement, newest first. Leave the list empty ([]) to hide the strip.
   date:   optional, e.g. "Nov 3" (use "" for none)
   urgent: true makes that line large and bold with a warning icon, and turns the whole strip solid red
           (for things like weather cancellations) */
/* Show a label in front of the announcements?
   true  -> "Announcements" (or "Important" when any line is urgent)
   false -> no label */
var SHOW_ANNOUNCEMENT_LABELS = false;

var ANNOUNCEMENTS = [
  //{ date: "", text: "Sample announcement: edit or delete this line in site-settings.js.", urgent: false }
  // { date: "Nov 3", text: "Range closed Monday due to weather.", urgent: true },
];

/* =================== END OF SETTINGS — don't edit below =================== */

/* Builds the Past Leagues menu and the Current League buttons from the settings at the top. */
(function(){
  /* SITE_ROOT is set at the top of league pages that live in a subfolder (e.g. "../../"). */
  var ROOT=(typeof SITE_ROOT==="string")?SITE_ROOT:"";
  /* Fix up logo/menu links that must point back to the main folder */
  document.querySelectorAll("[data-root-href]").forEach(function(el){el.href=ROOT+el.getAttribute("data-root-href");});
  document.querySelectorAll("[data-root-src]").forEach(function(el){el.src=ROOT+el.getAttribute("data-root-src");});
  var slug=CURRENT_LEAGUE.toLowerCase().replace(/\s+/g,"");
  var cur=document.getElementById("btn-current");
  var res=document.getElementById("btn-reserves");
  if(cur){cur.textContent=CURRENT_LEAGUE; cur.href=slug+".html";}
  if(res){res.href=slug+"_reserves.html";}
  /* Announcements strip */
  var box=document.getElementById("announcements");
  if(box && ANNOUNCEMENTS.length){
    var inner=document.createElement("div"), list=document.createElement("ul"), urgent=false;
    inner.className="ann-inner";
    ANNOUNCEMENTS.forEach(function(item){
      var li=document.createElement("li");
      if(item.date){var d=document.createElement("strong"); d.textContent=item.date+": "; li.appendChild(d);}
      li.appendChild(document.createTextNode(item.text));
      if(item.urgent){urgent=true; li.className="urgent";}
      list.appendChild(li);
    });
    if(SHOW_ANNOUNCEMENT_LABELS){
      var label=document.createElement("b");
      label.textContent=urgent?"Important":"Announcements";
      inner.className+=" labeled"; inner.appendChild(label);
    }
    inner.appendChild(list); box.appendChild(inner);
    if(urgent){box.className+=" urgent";}
    box.hidden=false;
  }

  var menu=document.getElementById("past-leagues");
  if(!menu){return;}
  PAST_LEAGUES.forEach(function(row){
    var year=row[0], div=document.createElement("div"), b=document.createElement("b");
    div.className="yr"; b.textContent=year; div.appendChild(b);
    row[1].forEach(function(name){
      var a=document.createElement("a");
      var slug2=name.toLowerCase()+year;
      a.href=ROOT+"past-leagues/"+slug2+"/"+slug2+".html"; a.textContent=name;
      a.target="_blank"; a.rel="noopener";
      div.appendChild(a);
    });
    menu.appendChild(div);
  });
  if(LEGACY_LINK){
    var lg=document.createElement("div"), la=document.createElement("a");
    lg.className="yr legacy"; la.href=ROOT+LEGACY_LINK.href; la.textContent=LEGACY_LINK.label;
    la.target="_blank"; la.rel="noopener"; lg.appendChild(la); menu.appendChild(lg);
  }
})();
