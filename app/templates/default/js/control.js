var control = {
	numContrat : null,

	init : function(numContrat , ajaxUrl , logOutUrl){
		this.div = $("#main-div");
		this.ajaxUrl = ajaxUrl;
		this.logOutUrl = logOutUrl;
		this.numContrat = numContrat;
		this.template();

		$(declarationSinistre).on("element-write" , function(){
            consultation.init(ajaxUrl);
            comparaison.loadSinistre();
		});
	},


	template : function(){
		let html = '';
		html += '\
		\
			<div id="div-declaration" class="col-sm-4">\
            </div>\
            \
            <div id="div-schema" class="col-sm-8">\
            </div>'+
            '<!-- The Modal -->\n' +
            '<div class="modal fade" id="myModal">\n' +
            '  <div class="modal-dialog modal-lg" style="max-width: 85%!important;" >\n' +
            '    <div class="modal-content" style="background:#212528">\n' +
            '\n' +
            '      <!-- Modal Header -->\n' +
            '      <div class="modal-header">\n' +
            '        <h4 class="modal-title" style="color: aliceblue">Liste des sinistres <span class="fas fa-address-book"></span></h4>\n' +
            '        <button type="button" class="close" data-dismiss="modal">&times;</button>\n' +
            '      </div>\n' +
            '\n' +
            '      <!-- Modal body -->\n' +
            '      <div class="modal-body">\n' +
            '        <div id="liste-sinistre" class="" style="margin-top: 30px;color:white">\n            </div>' +
            '      </div>\n' +
            '\n' +
            '      <!-- Modal footer -->\n' +
            '      <div class="modal-footer">\n' +
            '        <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>\n' +
            '      </div>\n' +
            '\n' +
            '    </div>\n' +
            '  </div>\n' +
            '</div>'+
         '</div>';

        this.div.html(html);

        console.log(this.logOutUrl);

        declarationSinistre.init(this.numContrat , this.ajaxUrl , this.logOutUrl);
        consultation.init(this.ajaxUrl);
        comparaison.init(this.ajaxUrl);

	},



}