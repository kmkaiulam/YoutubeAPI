const YOUTUBE_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';

function retrieveYoutubeData(searchTerm, callback){
    const query = {
    part: 'snippet',
    key: 'AIzaSyAJmE7PnY-JeE5bWuJcBXQdCxWPZklc8lM',
    q: `${searchTerm} in:name`,  
    per_page: 5 
    };
    $.getJSON(YOUTUBE_SEARCH_URL, query, callback);
}

function renderData(result) {
    return `
    <div>
        <h2>
        <a class ="js-result-name" href = "${result.html_url}" target = "_blank"></a>
        </h2>
        `;
}

function displayYoutubeSearchData(data){
        const results = data.items.map((item, index) => renderData(item));
        $('.js-search-results').html(results);
}

function listenSubmit(){
    $('.js-search-form').submit(event =>{
        event.preventDefault();
        const queryTarget =$(event.currentTarget).find ('.js-query');
        const query = queryTarget.val();
        queryTarget.val;("");
        retrieveYoutubeData(query, displayYoutubeSearchData);
    })
    console.log('This is listenSubmit');
}

$(listenSubmit);