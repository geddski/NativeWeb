define(function(){
    return {
        //generic method for mapping fields to be controlled
        mapFields: function(object, element, fields){
            var field
            for (var i = 0, length = fields.length, field; i < length; i +=1) {
                field = fields[i];
                object[field] = element.find('[data-field='+field+']').removeAttr('data-field');
            }
        }
    };
});


