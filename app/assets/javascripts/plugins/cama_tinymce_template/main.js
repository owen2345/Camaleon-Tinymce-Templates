// Tinymce templates selector, Note: the template should have class = mceTmpl
jQuery(function(){
    tinymce_global_settings["settings"].push(cama_mce_template_manager);
    tinymce_global_settings["setups"].push(cama_mce_template_setups);
});
function cama_mce_template_manager(settings, default_sett){
    if(!('templates' in default_sett)) default_sett['templates'] = [];
    if(!('content_style' in default_sett)) default_sett['content_style'] = "";
    default_sett['templates'].push({title: 'Sample Template', description: 'Sample template', content: '<div class="mceTmpl"><h1>Title Template</h1><div>body template</div></div>'});
    default_sett['content_style'] += ' .mceTmpl .tpl-plugin-icons{ position: absolute; left: 0; top: 0; font-size: 7px; cursor: pointer; display: none; outline: none;} .mceTmpl{border: 1px dashed transparent; position: relative;} .mceTmpl.mceTplHover{border-color: #ccc;} .mceTmpl.mceTplHover > .tpl-plugin-icons {display: block;}';
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
            $(this).removeClass('mceTplHover').children('.tpl-plugin-icons').remove();
            $(this).prepend('<div class="tpl-plugin-icons"><span class="tpl-select mceNonEditable">Select</span> | <span class="tpl-up mceNonEditable">Up</span> | <span class="tpl-down mceNonEditable">Down</span> | <span class="tpl-attrs mceNonEditable">Attrs</span></div>');
        });
        e.content = c.html();
    });

    editor.on('GetContent', function (e) {
        var c = $('<div>' + e.content + '</div>');
        c.find('.mceTmpl').each(function () {
            $(this).removeClass('mceTplHover').children('.tpl-plugin-icons').remove();
        });
        e.content = c.html();
    });

    editor.on('init', function (e) {
        $(editor.dom.doc.body).keyup(function(e){ // shit + enter => add and move into new line after template
            var thiss = editor.selection.getNode();
            var tpl = $(thiss).closest('.mceTmpl');
            console.log(e.keyCode == 13, e.shiftKey, thiss, tpl);
            if(e.keyCode == 13 && e.shiftKey && tpl.length >= 1){
                tpl.after('<p>new line</p>');
                editor.selection.select(editor.getBody(), true);
                editor.selection.collapse(false);
                return false;
            }
        });

        $(editor.dom.doc.body).on('click', '.mceTmpl > .tpl-plugin-icons span', function () {
            var tpl = $(this).closest('.mceTmpl');
            if($(this).hasClass('tpl-select')) editor.selection.select(tpl[0]);
            if($(this).hasClass('tpl-up')) tpl.prev().before(tpl);
            if($(this).hasClass('tpl-down')) tpl.next().after(tpl);
            if($(this).hasClass('tpl-attrs')){
                var html = $('<div id="template_settings_modal"></div><div class="form-group"><label class="control-label">Class Attributes</label><input type="text" class="form-control class_attr"></div></div>')
                html.find('input.class_attr').val(tpl.attr('class').replace('mceTplHover','').replace('mceTmpl',''))
                open_modal({title: 'Template Settings', content: html, on_submit: function(modal){
                    var cls_attr = modal.find('.class_attr').val().split(' ');
                    cls_attr.push('mceTplHover', 'mceTmpl');
                    tpl.attr('class', cls_attr.join(' '));
                    modal.modal('hide'); return false;
                }});
            }
            return false;
        });
    });
}