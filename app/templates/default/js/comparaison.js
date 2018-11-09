var comparaison = {
    init : function(ajaxUrl)
    {
        this.ajaxUrl = ajaxUrl;
        this.div = $("#div-schema");
        this.template();
        this.loadSinistre();
    },

    loadSinistre : function()
    {

        let that = this;
        let form = {
            action : "get-sinistres",
        }
        $.post(this.ajaxUrl , form , function(data){

            if(data.status != "OK"){
                alert("Oooops une erreure c'est produite !");
            }
            that.div.find(".row").html(null);
            console.log(data.ret);

            $.each(data.ret , function(index , s){
                that.drawBlock(this.Hash , this.PrecedentHash , index);
            });

        } , "json");
    },

    template : function()
    {
        this.div.html("<div class='row'></div>")
    },

    drawBlock : function(hash , previousHash , index)
    {
        let html = "";
        html += '<div class="col-sm-3" style="border: aliceblue 1px dotted;text-align: justify;">' +
            '<p> <span style="color:magenta;font-size: 0.6em">block n° : '+index+'</span> <br> ' +
            ' <span style="color:chartreuse;font-size: 0.5em">'+hash+'</span> <br> ' +
            '<span style="color:cyan;font-size: 0.5em">'+previousHash+'</span></p>'
            '</div>';
        this.div.find(".row").append(html);
    },
}