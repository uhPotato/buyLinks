javascript:(function(){
	var linkChecker = {
		isNotGlobalNav: function(l){
			if (l.getAttribute('class') != null) {
				return !l.getAttribute('class').includes('ac-gn');
			}			
		},
		isNotGlobalFooter: function(l){
			if (l.getAttribute('class') != null) {
				return !l.getAttribute('class').includes('ac-gf');
			}	
		},
		isBuyLink: function(l) {
			if (l.getAttribute('data-analytics-region') != null){
				return l.getAttribute('href').includes('/shop/goto/');
				
			}
		}
	};

	var links = document.links;
	var docTitle = document.title;
	var header = document.createElement('h2');
	var tblContainer = document.createElement('div');
	var tblBorder = document.createElement('style');
	var resultsWindow = window.open("", "resultsWindow", "width=1600,height=1000");
	
	var border = 'table, th, td { padding: 10px; border: 1px solid black; border-collapse: collapse;}';

	var tbl = '<table style="font-size: 16px; line-height:20px;">';
	tbl += '<thead style="font-weight:bold;"><tr><td>Link List</td><td>Link Rel</td><td>Region</td><td>Aria-Label</td></tr></thead><tbody>';

    
	for(var i = 0; i < links.length; i++){
		var link = links[i];
		
			if(linkChecker.isNotGlobalNav(link) &&
				linkChecker.isNotGlobalFooter(link) &&
				linkChecker.isBuyLink(link)){
				
				var href = link.getAttribute('href');
				var analyticsRegion = link.getAttribute('data-analytics-region');
				var linkRel = link.rel;
				var ariaLabel = link.getAttribute('aria-label');

				var landingLink = link.ping.getAttribute('href');
				console.log(landingLink);
				
				var arialTd = (ariaLabel != null) ? ariaLabel : "Aria-Label: null".fontcolor('red');
				var regionTd = (analyticsRegion != null) ? analyticsRegion : "Analytics Region: null".fontcolor('red');
				var resultLinkTd = landingLink;
			
				tbl += '<tr><td><a href="' + href + '">' + href + '</a></td><td>' + resultLinkTd + '</td><td>' + regionTd + '</td><td>' + arialTd + '</td></tr>';
				
			}
	}
	
	tbl += '</tbody></table>';

		
	header.innerHTML = docTitle;
	tblBorder.innerHTML = border;
	tblContainer.innerHTML = tbl;

	resultsWindow.document.body.innerHTML = '';
	resultsWindow.document.head.appendChild(tblBorder);
	resultsWindow.document.body.appendChild(header);
	resultsWindow.document.body.appendChild(tblContainer);
	resultsWindow.document.title = docTitle;

}());