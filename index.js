const YOUTUBE_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';
let previousToken = "";
let nextToken = "";
let oldQuery = "";

function retrieveYoutubeData(searchTerm, callback, token){
    const query = {
    part: 'snippet',
    key: 'AIzaSyAJmE7PnY-JeE5bWuJcBXQdCxWPZklc8lM',
    q: `${searchTerm}`,  
    type: 'video',
    maxResults: 5,
    pageToken: token 
    };
    $.getJSON(YOUTUBE_SEARCH_URL, query, callback);
}

function renderData(result) {
    return `
    <div>
        <h2> ${result.snippet.title}</h2>
        <div>
        <a href = "https://www.youtube.com/watch?v=${result.id.videoId}" target = "_blank">
        <img class = "videoThumbnail" src = "${result.snippet.thumbnails.medium.url}"></a>
        <a href = "https://www.youtube.com/channel/${result.snippet.channelId}" target = "_blank"> <input type ="button" value = "View Channel"> </a>
        </div>
        `;
}



function displayYoutubeSearchData(data){
    console.log(data);
    if (data.nextPageToken) {
        nextToken= data.nextPageToken;
       $('#nextButton').show();
    }
    else {
        nextToken = "";
        $('#nextButton').hide();
    }
    if (data.prevPageToken) {
        previousToken = data.prevPageToken
        $('#previousButton').show();
    }
    else {
        previousToken = "";
        $('#previousButton').hide();
    }
    const results = data.items.map((item) => renderData(item));
       
        $('.js-search-results').html(results);
}

function listenSubmit(){
    $('.js-search-form').submit(event =>{
        event.preventDefault();
        const queryTarget =$(event.currentTarget).find ('.js-query');
        const query = queryTarget.val();
        console.log(query);
        oldQuery = query;
        queryTarget.val("");
        retrieveYoutubeData(query, displayYoutubeSearchData,"");
        
    })
    $('#nextButton').click( event =>{
        event.preventDefault();
        retrieveYoutubeData(oldQuery, displayYoutubeSearchData, nextToken);
    })
    $('#previousButton').click( event =>{
        event.preventDefault();
        retrieveYoutubeData(oldQuery, displayYoutubeSearchData, previousToken);
    })
    console.log('This is listenSubmit');
}


$(listenSubmit);