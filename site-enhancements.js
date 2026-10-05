(() => {
  const leadership = [
    {
      title: "Office of the President",
      affiliation: "AME Zion University, Nimba Extension Campus",
      description:
        "Provides overall leadership for the university and its extension campuses, and represents the institution before the Board of Trustees and the public.",
    },
    {
      title: "Vice President for Extension",
      affiliation: "AME Zion University, Nimba County",
      description:
        "Oversees curriculum, faculty appointments, academic standards, and degree programs across all colleges and campuses.",
    },
    {
      title: "Dean, Student & Academic Affairs Nimba Extension Campus",
      affiliation: "Nimba Extension Campus",
      description:
        "Leads day-to-day campus operations in Ganta City, including student affairs, facilities, and community relations.",
    },
    {
      title: "Dean of Admissions & Records",
      affiliation: "Nimba Extension Campus",
      description:
        "Manages applications, entrance requirements, student registration, transcripts, and academic records for the campus.",
    },
    {
      title: "Dean of Student Affairs",
      affiliation: "Nimba Extension Campus",
      description:
        "Supports student life, organizations, athletics, discipline, and the personal wellbeing of every student on campus.",
    },
    {
      title: "Board of Trustees",
      affiliation: "AME Zion University",
      description:
        "The governing body of the university, responsible for institutional policy, fiduciary oversight, and the long-term direction of the institution.",
    },
  ];

  const philosophyOutcomes = [
    {
      title: "Academically Prepared",
      statements: [
        "Use critical thinking skills to demonstrate literacy: listing, speaking, writing, reading, viewing, and visual representation.",
        "Demonstrate competence in Business and Management, Mathematics, Science, Agriculture, Nursing, and technological skills.",
      ],
    },
    {
      title: "Biblically Rooted",
      statements: [
        "Demonstrate spiritual literacy, including Biblical Christian faith and practice, AME Zion perspectives, and the Christian’s role in fulfilling the Great Commission.",
      ],
    },
    {
      title: "Globally Minded",
      statements: [
        "Respect diverse religious, cultural, philosophical, and aesthetic experiences and perspectives.",
      ],
    },
    {
      title: "Equipped to Serve",
      statements: [
        "Transfer academic studies to a profession and the workplace.",
        "Implement a personal and social ethic that results in informed participation at multiple levels of community.",
      ],
    },
  ];

  const normalize = (value) => value.trim().replace(/\s+/g, " ").toLowerCase();
  let dialog;
  let previousFocus = null;
  let syncTimer;

  function addStyle(id, cssText) {
    if (document.getElementById(id)) {
      return;
    }
    const style = document.createElement("style");
    style.id = id;
    style.textContent = cssText;
    document.head.append(style);
  }

  function createLeadershipCard(person) {
    const card = document.createElement("article");
    card.className = "university-leadership-card";

    const affiliation = document.createElement("p");
    affiliation.className = "university-leadership-affiliation";
    affiliation.textContent = person.affiliation;

    const title = document.createElement("h3");
    title.textContent = person.title;

    const description = document.createElement("p");
    description.className = "university-leadership-description";
    description.textContent = person.description;

    card.append(affiliation, title, description);
    return card;
  }

  function mountLeadership(main) {
    const section = Array.from(main.querySelectorAll("section")).find(
      (candidate) =>
        candidate.querySelector("h2")?.textContent.trim() === "Leadership & governance" &&
        candidate.querySelector("h3"),
    );
    if (!section || section.querySelector(".university-leadership-grid")) {
      return;
    }

    section.replaceChildren();
    section.id = "university-leadership";
    section.className = "university-leadership";
    section.setAttribute("aria-labelledby", "university-leadership-title");

    const container = document.createElement("div");
    container.className = "university-leadership-container";
    const intro = document.createElement("div");
    intro.className = "university-leadership-intro";
    const heading = document.createElement("h2");
    heading.id = "university-leadership-title";
    heading.textContent = "Leadership & governance";
    const subheading = document.createElement("p");
    subheading.className = "university-leadership-subheading";
    subheading.textContent =
      "The offices responsible for the academic, administrative, and spiritual life of the Nimba Extension Campus.";
    intro.append(heading, subheading);

    const grid = document.createElement("div");
    grid.className = "university-leadership-grid";
    for (const person of leadership) {
      grid.append(createLeadershipCard(person));
    }
    container.append(intro, grid);
    section.append(container);

    addStyle(
      "university-leadership-style",
      `
        .university-leadership { padding: 4rem 0 5rem; background: #f7f5f0; scroll-margin-top: 7rem; }
        .university-leadership-container { width: min(100% - 2rem, 72rem); margin-inline: auto; }
        .university-leadership-intro { max-width: 48rem; }
        #university-leadership-title { margin: 0; color: #171717; font-family: Fraunces, Georgia, serif; font-size: clamp(1.875rem, 4vw, 2.5rem); font-weight: 600; line-height: 1.2; }
        .university-leadership-subheading { margin: 1rem 0 0; color: #57534e; font-size: 1rem; line-height: 1.7; }
        .university-leadership-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 1.25rem; margin-top: 2.5rem; }
        .university-leadership-card { padding: 1.5rem; border: 1px solid #e7e5e4; border-radius: .625rem; background: #fff; box-shadow: 0 8px 20px rgb(0 0 0 / 5%); }
        .university-leadership-affiliation { margin: 0 0 .75rem; color: #a16207; font-size: .75rem; font-weight: 600; letter-spacing: .04em; line-height: 1.5; }
        .university-leadership-card h3 { margin: 0; color: #171717; font-family: Fraunces, Georgia, serif; font-size: 1.125rem; font-weight: 600; line-height: 1.4; }
        .university-leadership-description { margin: .75rem 0 0; color: #57534e; font-size: .875rem; line-height: 1.7; }
        @media (max-width: 900px) { .university-leadership-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
        @media (max-width: 600px) { .university-leadership { padding: 3.5rem 0; } .university-leadership-grid { grid-template-columns: 1fr; } .university-leadership-card { padding: 1.25rem; } }
      `,
    );
  }

  function mountPhilosophy(main) {
    const missionHeading = Array.from(main.querySelectorAll("h3")).find(
      (heading) => heading.textContent.trim() === "Our Mission",
    );
    const article = missionHeading?.closest("article");
    if (!article || article.querySelector(".educational-philosophy")) {
      return;
    }

    const missionCard = article.parentElement;
    if (missionCard) {
      missionCard.style.gridColumn = "1 / -1";
    }

    const philosophy = document.createElement("div");
    philosophy.className = "educational-philosophy";
    const title = document.createElement("h3");
    title.className = "educational-philosophy-title";
    title.textContent = "Educational Philosophy";

    const introduction = document.createElement("p");
    introduction.className = "educational-philosophy-intro";
    introduction.textContent =
      "AME Zion University is a co-educational institution that exists to provide quality tertiary education within a Christian environment intended to meet the spiritual, intellectual, and professional needs of students, our nation, and people everywhere, with the desire that each student acquire certain knowledge, skills, and aspirations during their collegiate experience.";

    const completion = document.createElement("p");
    completion.className = "educational-philosophy-completion";
    completion.textContent = "Upon completion of a degree program, each student at AMEZU shall be:";

    const outcomeGrid = document.createElement("div");
    outcomeGrid.className = "educational-philosophy-outcomes";
    for (const outcome of philosophyOutcomes) {
      const section = document.createElement("section");
      section.className = "educational-philosophy-outcome";
      const heading = document.createElement("h4");
      heading.textContent = outcome.title;
      section.append(heading);

      for (const statement of outcome.statements) {
        const paragraph = document.createElement("p");
        paragraph.textContent = statement;
        section.append(paragraph);
      }
      outcomeGrid.append(section);
    }

    philosophy.append(title, introduction, completion, outcomeGrid);
    article.replaceChildren(philosophy);
    addStyle(
      "educational-philosophy-style",
      `
        .educational-philosophy-title { margin: 0; color: #171717; font-family: Fraunces, Georgia, serif; font-size: clamp(1.5rem, 3vw, 2rem); font-weight: 600; letter-spacing: .04em; line-height: 1.25; text-transform: uppercase; }
        .educational-philosophy-intro, .educational-philosophy-completion { margin: 1rem 0 0; color: #57534e; font-size: 1rem; line-height: 1.75; }
        .educational-philosophy-completion { font-weight: 600; }
        .educational-philosophy-outcomes { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 1.25rem; margin-top: 1.5rem; }
        .educational-philosophy-outcome { padding: 1.25rem; border: 1px solid #e7e5e4; border-radius: .625rem; background: #fafaf9; }
        .educational-philosophy-outcome h4 { margin: 0; color: #a16207; font-size: .875rem; font-weight: 700; letter-spacing: .1em; line-height: 1.5; text-transform: uppercase; }
        .educational-philosophy-outcome p { margin: .75rem 0 0; color: #57534e; font-size: .875rem; line-height: 1.7; }
        @media (max-width: 640px) { .educational-philosophy-outcomes { grid-template-columns: 1fr; } .educational-philosophy-outcome { padding: 1rem; } }
      `,
    );
  }

  function getCollegeCards(main) {
    return Array.from(main.querySelectorAll("a")).filter(
      (link) => link.querySelector("h3") && link.querySelector("ul"),
    );
  }

  function createCollegeDialog() {
    if (dialog) {
      return;
    }

    dialog = document.createElement("dialog");
    dialog.id = "college-details-dialog";
    dialog.setAttribute("aria-labelledby", "college-details-title");
    dialog.innerHTML = `
      <div class="college-dialog-content">
        <button class="college-dialog-close" type="button" aria-label="Close college details">&times;</button>
        <p class="college-dialog-eyebrow">College overview</p>
        <h2 id="college-details-title"></h2>
        <p class="college-dialog-description"></p>
        <h3>Areas of focus</h3>
        <ul class="college-dialog-focus"></ul>
        <a class="college-dialog-apply" href="../admissions/">Admissions information <span aria-hidden="true">&rarr;</span></a>
      </div>
    `;
    document.body.append(dialog);

    dialog.querySelector(".college-dialog-close").addEventListener("click", () => dialog.close());
    dialog.addEventListener("click", (event) => {
      if (event.target === dialog) {
        dialog.close();
      }
    });
    dialog.addEventListener("close", () => {
      if (previousFocus instanceof HTMLElement && previousFocus.isConnected) {
        previousFocus.focus();
      }
    });

    addStyle(
      "college-details-style",
      `
        #college-details-dialog { width: min(38rem, calc(100% - 2rem)); max-width: none; max-height: min(85vh, 42rem); padding: 0; color: #171717; background: #fff; border: 1px solid #e7e5e4; border-radius: 1rem; box-shadow: 0 24px 80px rgb(0 0 0 / 28%); }
        #college-details-dialog::backdrop { background: rgb(0 0 0 / 65%); }
        .college-dialog-content { position: relative; padding: 2rem; }
        .college-dialog-close { position: absolute; top: 1rem; right: 1rem; width: 2.5rem; height: 2.5rem; border: 1px solid #e7e5e4; border-radius: .5rem; background: #fff; font-size: 1.75rem; line-height: 1; cursor: pointer; }
        .college-dialog-eyebrow { margin: 0 3rem .75rem 0; color: #a16207; font-size: .75rem; font-weight: 700; letter-spacing: .16em; text-transform: uppercase; }
        #college-details-title { margin: 0 2rem 1rem 0; font-size: clamp(1.5rem, 4vw, 2rem); line-height: 1.2; }
        .college-dialog-description { color: #57534e; line-height: 1.7; }
        #college-details-dialog h3 { margin: 1.5rem 0 .75rem; font-size: 1rem; }
        .college-dialog-focus { display: flex; flex-wrap: wrap; gap: .5rem; padding: 0; list-style: none; }
        .college-dialog-focus li { padding: .4rem .7rem; border-radius: 999px; background: #f5f5f4; font-size: .875rem; }
        .college-dialog-apply { display: inline-flex; gap: .5rem; align-items: center; margin-top: 1rem; padding: .75rem 1rem; border-radius: .5rem; color: #171717; background: #eab308; font-weight: 700; text-decoration: none; }
        .college-dialog-close:focus-visible, .college-dialog-apply:focus-visible { outline: 3px solid #a16207; outline-offset: 3px; }
        @media (max-width: 480px) { .college-dialog-content { padding: 1.5rem; } }
      `,
    );
  }

  function mountCollegeCards(main) {
    const cards = getCollegeCards(main);
    if (cards.length) {
      createCollegeDialog();
      for (const card of cards) {
        if (card.getAttribute("aria-haspopup") !== "dialog") {
          card.setAttribute("aria-haspopup", "dialog");
        }
        if (card.getAttribute("aria-controls") !== dialog.id) {
          card.setAttribute("aria-controls", dialog.id);
        }
      }
    }
  }

  function openCollege(card) {
    createCollegeDialog();
    previousFocus = document.activeElement;
    dialog.querySelector("#college-details-title").textContent =
      card.querySelector("h3").textContent.trim();
    dialog.querySelector(".college-dialog-description").textContent =
      card.querySelector("p").textContent.trim();
    const focusList = dialog.querySelector(".college-dialog-focus");
    focusList.replaceChildren(
      ...Array.from(card.querySelectorAll("ul li"), (item) => {
        const tag = document.createElement("li");
        tag.textContent = item.textContent.trim();
        return tag;
      }),
    );
    if (!dialog.open) {
      dialog.showModal();
    }
  }

  function handleCollegeClick(event) {
    if (!(event.target instanceof Element)) {
      return;
    }

    const link = event.target.closest("a");
    const main = document.querySelector("main");
    if (!link || !main) {
      return;
    }

    const cards = getCollegeCards(main);
    const cardLink = cards.includes(link);
    const card = cardLink
      ? link
      : cards.find(
          (candidate) =>
            normalize(candidate.querySelector("h3").textContent.replace(/^College of\s+/i, "")) ===
            normalize(link.textContent),
        );
    if (!card) {
      return;
    }

    event.preventDefault();
    event.stopImmediatePropagation();
    openCollege(card);
  }

  function sync() {
    const main = document.querySelector("main");
    if (!main) {
      return;
    }
    mountLeadership(main);
    mountPhilosophy(main);
    mountCollegeCards(main);
  }

  function scheduleSync() {
    window.clearTimeout(syncTimer);
    syncTimer = window.setTimeout(sync, 450);
  }

  document.addEventListener("click", handleCollegeClick, true);
  window.addEventListener("load", scheduleSync, { once: true });
  window.addEventListener("popstate", scheduleSync);

  const observer = new MutationObserver(scheduleSync);
  observer.observe(document.documentElement, { childList: true, subtree: true });
  scheduleSync();
})();
