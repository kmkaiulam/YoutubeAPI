const YOUTUBE_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';



function retrieveYoutubeData(searchTerm, callback){
    const query = {
    part: 'snippet',
    key: 'AIzaSyAJmE7PnY-JeE5bWuJcBXQdCxWPZklc8lM',
    q: `${searchTerm}`,  
    type: 'video',
    maxResults: 5 
    };
    $.getJSON(YOUTUBE_SEARCH_URL, query, callback);
}

function renderData(result) {
    return `
    <div>
        <h2>
        <a href = "https://www.youtube.com/watch?v=${result.id.videoId}" target = "_blank">
        <img src = "${result.snippet.thumbnails.medium.url}"></a>
        </h2>
        `;
}

function displayYoutubeSearchData(data){
    console.log(data);
    const results = data.items.map((item) => renderData(item));
       
        $('.js-search-results').html(results);
}

function listenSubmit(){
    $('.js-search-form').submit(event =>{
        event.preventDefault();
        const queryTarget =$(event.currentTarget).find ('.js-query');
        const query = queryTarget.val();
        console.log(query);
        queryTarget.val("");
        retrieveYoutubeData(query, displayYoutubeSearchData);
        
    })
    console.log('This is listenSubmit');
}

$(listenSubmit);