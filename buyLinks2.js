javascript: (function(){

    // the minimum version of jQuery we want
    var v = "1.3.2";

    // check prior inclusion and version
    if (window.jQuery === undefined || window.jQuery.fn.jquery < v) {
        var done = false;
        var script = document.createElement("script");
        script.src = "http://ajax.googleapis.com/ajax/libs/jquery/" + v + "/jquery.min.js";
        script.onload = script.onreadystatechange = function(){
            if (!done && (!this.readyState || this.readyState == "loaded" || this.readyState == "complete")) {
                done = true;
                initMyBookmarklet();
            }
        };
        document.getElementsByTagName("head")[0].appendChild(script);
    } else {
        initMyBookmarklet();
    }

    function initMyBookmarklet() {
        (window.myBookmarklet = function(){
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
        
                        $(document).ready(function(){
                            $(".get-url-link").click(function(){
                              var url = $(this).attr('action');
                              alert(url);
                            });
                          });
                        
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
        
        }())();
    }

})();