// --- IMPORTANT: REPLACE WITH YOUR GOOGLE APPS SCRIPT WEB APP URL ---
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbz2Ch_w2cjpMu5IG-kqvXOquAo-sJINvoyXzddzlF4mGmRb75hnbVKpTVcx7_bOdMOv/exec'; // Keep your existing URL here!

let currentLang = 'en';

// --- Bilingual Translations ---
const translations = {
    en: {
        title: `<img src="assets/praful-ananya-title.png" alt="Praful & Ananya's Vivaah Utsav" class="title-img">`,
        selectEvents: "Please select the events you will attend:",
        haldiTitle: "Haldi",
        haldiTime: "Nov 20 | 10:00 AM (Followed by Lunch)",
        haldiVenue: "📍 Pandharinath Niwas",
        sangeetTitle: "Sangeet",
        sangeetTime: "Nov 20 | 6:00 PM (Followed by Dinner)",
        sangeetVenue: "📍 Pandharinath Niwas",
        vivaahTitle: "Vivaah Sanskar",
        vivaahTime: "Nov 21 | 11:00 AM (Followed by Lunch)",
        vivaahVenue: "📍 Lamba Celebrations",
        snehTitle: "Sneh Milan",
        snehTime: "Nov 22 | All Day",
        snehVenue: "📍 Pandharinath Niwas",
        mapText: "(View Map)",
        btnYes: "Yes, We'll attend",
        btnNo: "No, We won't attend",
        btnEdit: "Change Response",
        lblName: "Full Name",
        lblArrDate: "Arrival Date",
        lblArrTime: "Arrival Time",
        lblAdults: "Adults",
        lblChild: "Children",
        lblReq: "Special requests (Travel, Accommodation, Food)",
        btnSubmit: "Submit Details",
        thankYouNo: "Thank You!",
        thankYouYes: "Thank you! Your RSVP has been received."
    },
    hi: {
        title: `<img src="assets/praful-ananya-title-hi.png" alt="प्रफुल और अनन्या का विवाह उत्सव" class="title-img">`,
        selectEvents: "कृपया उन कार्यक्रमों का चयन करें जिनमें आप शामिल होंगे:",
        haldiTitle: "हल्दी",
        haldiTime: "२० नवंबर | सुबह १०:०० बजे (तदनंतर लंच)",
        haldiVenue: "📍 पंढरीनाथ निवास",
        sangeetTitle: "संगीत संध्या",
        sangeetTime: "२० नवंबर | शाम ६:०० बजे (तदनंतर डिनर)",
        sangeetVenue: "📍 पंढरीनाथ निवास",
        vivaahTitle: "विवाह संस्कार",
        vivaahTime: "२१ नवंबर | सुबह ११:०० बजे (तदनंतर लंच)",
        vivaahVenue: "📍 लांबा सेलिब्रेशंस",
        snehTitle: "स्नेह मिलन",
        snehTime: "२२ नवंबर | पूरे दिन",
        snehVenue: "📍 पंढरीनाथ निवास",
        mapText: "(गूगल लोकेशन देखें)",
       btnYes: "हाँ, हम आएँगे",
        btnNo: "नहीं, फिर मिलेंगे",
        btnEdit: "जवाब बदलें",
        lblName: "पूरा नाम",
        lblArrDate: "आगमन की तारीख",
        lblArrTime: "आगमन का समय",
        lblAdults: "वयस्कों की संख्या",
        lblChild: "बच्चों की संख्या",
        lblReq: "यात्रा, आवास या भोजन के लिए कोई विशेष व्यवस्था?",
        btnSubmit: "फॉर्म जमा करें",
        thankYouNo: "धन्यवाद!",
        thankYouYes: "धन्यवाद! आपकी उपस्थिति दर्ज कर ली गई है।"
    }
};

// --- View Transition & Language ---
function selectLanguage(lang) {
    currentLang = lang;
    const t = translations[lang];
    
    document.getElementById('text-title').innerHTML = t.title; 
    document.getElementById('text-select-events').innerText = t.selectEvents;
    
    // Event specific details
    document.getElementById('title-haldi').innerText = t.haldiTitle;
    document.getElementById('time-haldi').innerText = t.haldiTime;
    document.getElementById('venue-haldi').innerText = t.haldiVenue;
    
    document.getElementById('title-sangeet').innerText = t.sangeetTitle;
    document.getElementById('time-sangeet').innerText = t.sangeetTime;
    document.getElementById('venue-sangeet').innerText = t.sangeetVenue;
    
    document.getElementById('title-vivaah').innerText = t.vivaahTitle;
    document.getElementById('time-vivaah').innerText = t.vivaahTime;
    document.getElementById('venue-vivaah').innerText = t.vivaahVenue;
    
    document.getElementById('title-sneh').innerText = t.snehTitle;
    document.getElementById('time-sneh').innerText = t.snehTime;
    document.getElementById('venue-sneh').innerText = t.snehVenue;

    // Update all map link texts
    document.querySelectorAll('.map-txt').forEach(el => el.innerText = t.mapText);

    document.getElementById('btn-yes').innerText = t.btnYes;
    document.getElementById('btn-no').innerText = t.btnNo;
    document.getElementById('btn-edit').innerText = t.btnEdit;
    
    document.getElementById('label-name').innerText = t.lblName;
    document.getElementById('label-arr-date').innerText = t.lblArrDate;
    document.getElementById('label-arr-time').innerText = t.lblArrTime;
    document.getElementById('label-adults').innerText = t.lblAdults;
    document.getElementById('label-child').innerText = t.lblChild;
    document.getElementById('label-req').innerText = t.lblReq;
    document.getElementById('btn-submit').innerText = t.btnSubmit;

    const rootBody = document.body;
    if (lang === 'hi') {
        rootBody.classList.add('hindi-font');
    } else {
        rootBody.classList.remove('hindi-font');
    }

    document.getElementById('lang-page').classList.remove('active');
    document.getElementById('lang-page').classList.add('hidden'); 
    
    setTimeout(() => {
        const invitePage = document.getElementById('invite-page');
        invitePage.classList.remove('hidden'); 
        invitePage.classList.add('active');    
        window.scrollTo(0, 0); 
    }, 100);
}

// --- Helper to get checkboxes ---
// --- Helper to get checkboxes as Yes/No ---
function getEventSelections() {
    return {
        haldi: document.getElementById('chk-haldi').checked ? 'Yes' : 'No',
        sangeet: document.getElementById('chk-sangeet').checked ? 'Yes' : 'No',
        vivaah: document.getElementById('chk-vivaah').checked ? 'Yes' : 'No',
        sneh: document.getElementById('chk-sneh').checked ? 'Yes' : 'No'
    };
}

// --- RSVP Form Logic ---
function handleRSVP(status) {
    const rsvpActions = document.getElementById('rsvp-actions');
    const form = document.getElementById('rsvp-form');

    rsvpActions.classList.add('hidden');

    if (status === 'no') {
        // HIDE Glass Panel, SHOW Final Screen
        document.getElementById('glass-panel').classList.add('hidden');
        document.getElementById('thank-you-section').classList.remove('hidden');
        document.getElementById('text-thank-you').innerText = translations[currentLang].thankYouNo;

        // Submit the "No"
        const events = getEventSelections();
        submitToSheets({ 
            language: currentLang === 'en' ? 'English' : 'Hindi',
            attending: 'No', 
            haldi: events.haldi,
            sangeet: events.sangeet,
            vivaah: events.vivaah,
            sneh: events.sneh
        }); 
    } else {
        form.classList.remove('hidden');
        setTimeout(() => {
            document.getElementById('btn-submit').scrollIntoView({ behavior: 'smooth', block: 'end' });
        }, 100);
    }
}

// --- Form Submission (Yes) ---
document.getElementById('rsvp-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const submitBtn = document.getElementById('btn-submit');
    submitBtn.innerText = currentLang === 'en' ? 'Sending...' : 'भेजा जा रहा है...';
    submitBtn.disabled = true;

    const events = getEventSelections();
    const formData = {
        language: currentLang === 'en' ? 'English' : 'Hindi',
        attending: 'Yes',
        haldi: events.haldi,
        sangeet: events.sangeet,
        vivaah: events.vivaah,
        sneh: events.sneh,
        name: document.getElementById('guest-name').value,
        arrivalDate: document.getElementById('arrival-date').value,
        arrivalTime: document.getElementById('arrival-time').value,
        adults: document.getElementById('adults').value,
        children: document.getElementById('children').value,
        requests: document.getElementById('special-requests').value || "None"
    };

    submitToSheets(formData);
});

// --- API call to Google Apps Script ---
function submitToSheets(data) {
    fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(data)
    })
    .then(() => {
        if (data.attending === 'Yes') {
            // HIDE Glass Panel, SHOW Final Screen
            document.getElementById('glass-panel').classList.add('hidden');
            document.getElementById('thank-you-section').classList.remove('hidden');
            document.getElementById('text-thank-you').innerText = translations[currentLang].thankYouYes;
        }
    })
    .catch(error => {
        console.error('Error!', error.message);
        alert('There was an issue submitting your RSVP. Please try again.');
        document.getElementById('btn-submit').disabled = false;
        document.getElementById('btn-submit').innerText = translations[currentLang].btnSubmit;
    });
}

// --- Reset / Change Response ---
function resetRSVP() {
    // Hide thank you screen, BRING BACK Glass panel
    document.getElementById('thank-you-section').classList.add('hidden');
    document.getElementById('glass-panel').classList.remove('hidden');
    
    // Reset internal states so they can edit
    document.getElementById('rsvp-form').classList.add('hidden');
    document.getElementById('rsvp-actions').classList.remove('hidden');
    
    document.getElementById('btn-submit').disabled = false;
    document.getElementById('btn-submit').innerText = translations[currentLang].btnSubmit;
}