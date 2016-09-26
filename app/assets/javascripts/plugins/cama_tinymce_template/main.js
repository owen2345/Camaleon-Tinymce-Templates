// Tinymce templates selector, Note: the template should have class = mceTmpl
jQuery(function(){
    tinymce_global_settings["settings"].push(cama_mce_template_manager);
    tinymce_global_settings["setups"].push(cama_mce_template_setups);
});
function cama_mce_template_manager(settings, default_sett){
    if(!('templates' in default_sett)) default_sett['templates'] = [];
    if(!('content_style' in default_sett)) default_sett['content_style'] = "";
    default_sett['templates'].push({title: 'Sample Template', description: 'Sample template', content: '<div class="mceTmpl"><h1>Title Template</h1><div>body template</div></div>'});
    default_sett['content_style'] += ' span.mce-tpl-icon{ position: absolute; right: 0; top: 0; font-size: 7px; cursor: pointer; display: none;} .mceTmpl{border: 1px dashed transparent; position: relative;} .mceTmpl.mceTplHover{border-color: #ccc;} .mceTmpl.mceTplHover > span.mce-tpl-icon{display: block;}';
}

function cama_mce_template_setups(editor) {
    editor.on('NodeChange', function (e) {
        if ('selectionChange' in e) {
            var p = $(e.element).closest('.mceTmpl')
            $(editor.dom.doc.body).find('.mceTmpl').not(p).removeClass('mceTplHover');
            if (p.length > 0) p.addClass('mceTplHover');
        }
    });

    editor.on('BeforeSetContent', function (e) {
        var c = $('<div>' + e.content + '</div>')
        c.find('.mceTmpl').each(function () {
            $(this).removeClass('mceTplHover').children('.mce-tpl-icon').remove();
            $(this).prepend('<span class="mce-tpl-icon mceNonEditable">Copy</span>');
        });
        e.content = c.html();
    });

    editor.on('GetContent', function (e) {
        var c = $('<div>' + e.content + '</div>');
        c.find('.mceTmpl').each(function () {
            $(this).removeClass('mceTplHover').children('.mce-tpl-icon').remove();
        });
        e.content = c.html();
    });

    editor.on('init', function (e) {
        $(editor.dom.doc.body).on('click', '.mceTmpl > .mce-tpl-icon', function () {
            console.log(this);
            editor.selection.select($(this).parent()[0]);
        });
    });
}