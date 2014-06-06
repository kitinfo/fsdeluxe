var schwarzwald = schwarzwald || {};

schwarzwald.api = {
	fetch:function(payload, completionFunc, errFunc){
		ajax.asyncPost(schwarzwald.config.apiBase+"fetch/", JSON.stringify(payload), function(request){
			if(request.status!=200){
				errFunc("Data fetch returned HTTP "+request.status);
			}
			else{
				try{
					var data=JSON.parse(request.responseText);
				}
				catch(e){
					errFunc("Failed to parse Response: "+e.message);
					return;
				}
				if(data.code!=200){
					errFunc(data.message);
					return;
				}
				completionFunc(data);
			}
		}, function(error){
			errFunc(error.message);
		}, "application/json");	
	},
	
	fetchLectures:function(completionFunc, errFunc){
		schwarzwald.api.fetch({"content":"lectures"}, completionFunc, errFunc);
	},

	fetchProfessors:function(completionFunc, errFunc){
		schwarzwald.api.fetch({"content":"professors"}, completionFunc, errFunc);
	},

	search:function(type, filter, completionFunc, errFunc){
		//TODO query search/ endpoint
	}
};
