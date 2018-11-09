var control = {
	numContrat : null,

	init : function(numContrat , ajaxUrl){
		this.div = $("#main-div");
		this.ajaxUrl = ajaxUrl;
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
		\	<div class="col-sm-12">\
		\
		    <!-- Button to Open the Modal -->\n' +
            '<button type="button" class="btn btn-primary" style="margin-top: 30px;margin-bottom:5px" data-toggle="modal" data-target="#myModal">\n' +
            '  Consulter les entrées !\n' +
            '</button>\n' +
            '<a href="http://localhost/wkblockchain/logout" class="btn btn-danger" style="margin-top: 30px;margin-bottom:5px;margin-left: 18px">\n' +
            '  Se déconnecter\n' +
            '</a> <span class="" style="margin-left:290px;color: aliceblue"><i class="fas fa-link"></i> Schéma de la BlockChain <i class="fas fa-link"></i></span>\n' +
            '\n\
		\
		    </div>\
			<div id="div-declaration" class="col-sm-4">\
            </div>\
            \
            <div id="div-schema" class="col-sm-8">\
            </div>'+
            '<!-- The Modal -->\n' +
            '<div class="modal fade" id="myModal">\n' +
            '  <div class="modal-dialog modal-lg" style="max-width: 1350px!important;" >\n' +
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
            '        <div id="liste-sinistre" class="col-sm-12" style="margin-top: 30px;color:white">\n            </div>' +
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

        declarationSinistre.init(this.numContrat , this.ajaxUrl);
        consultation.init(this.ajaxUrl);
        comparaison.init(this.ajaxUrl);

	},



}