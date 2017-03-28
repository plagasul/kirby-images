(function($) {
	$.fn.images = function() {
		return this.each(function() {
			var field = $(this);
			var fieldname = 'images';

			if(field.data( fieldname )) {
				return true;
			} else {
				field.data( fieldname, true );
			}
			
			function reset() {
			  if (field.find(".grid-item.selected").length) {
			    field.find(".empty").hide();
			  }
			  else {
			    field.find(".empty").show();
			  }
			  field.find(".add").removeClass("over");
			  field.find(".grid-item").removeClass("over");
			};
			
			reset();
			
			function write() {
			  field.find("input.images").val("");
			  if (field.find(".grid-item.selected").length > 1) {
			    filenames = new Array();
			    field.find(".grid-item.selected").each(function() {
			      filenames.push($(this).data("image"));
			    });
			    field.find("input.images").val(filenames.join(","));
			  }
			  else {
			    field.find("input.images").val(field.find(".grid-item.selected").data("image"));
			  }
			  
			}
			
			function select(filename) {
			  var file = field.find(".grid-item[data-image='" + filename + "']");
			  file.insertBefore(field.find(".add")).addClass("selected");
			  field.find(".empty").hide();
			  field.find(".images-add-button select option[data-filename='" + filename + "']").attr("disabled", "disabled");
			  write();
			};
			
			function remove(filename) {
			  field.find(".grid-item[data-image='" + filename + "']").removeClass("selected");
			  field.find(".images-add-button select option[data-filename='" + filename + "']").removeAttr("disabled");
			  reset();
			  write();
			};
			
			field.find(".grid-item .btn.remove").on("click", function () {
			  var filename = $(this).closest(".grid-item").data("image");
			  remove(filename);
			  return false;
			});
			
			field.find(".images-add-button select").on("change", function(e) {
		    select($(this).find("option:selected").text());
		    $(this).val($(this).find("option:first").val());
			});
						
			var files    = field.find('.files');
			var sortable = files.find('.sortable');
			var items    = files.find('.grid-item');
			var api      = files.data('api');
			
			if(sortable.find('.grid-item').length > 1) {
			  sortable.sortable({
			    tolerance: "pointer",
			    revert: 100,
			    handle: "figure",
			    items: ".selected",
			    update: function() {
            write();
			    }
			  }).disableSelection();
			}
			
			field.find('.field-content').droppable({
			  tolerance: "pointer",
			  hoverClass: 'over',
			  accept: $('.sidebar .draggable-file'),
			  drop: function(e, ui) {
			    field.find(".add").removeClass("over");
			    field.find(".grid-item").removeClass("over");
			    var droppedImage = ui.draggable.data('helper');
		      select(droppedImage);
			  },
			  over: function(e, ui) {
			    field.find(".empty").hide();
			    var droppableImage = field.find(".grid-item[data-image='" + ui.draggable.data('helper') + "']");
			    
			    if (droppableImage.hasClass("selected")) {
			      droppableImage.addClass("over");
			    }
			    else {
			      var visibleItem = field.find(".grid-item.selected figure");
			      if (visibleItem.length) {
			        var height = visibleItem.height() - 4;
			      }
			      else {
			        var invisibleItem = field.find(".grid-item").first();
			        invisibleItem.addClass("selected");
			        var height = invisibleItem.find("figure").height() - 4;
			        invisibleItem.removeClass("selected");
			      }
			      field.find(".add .inner").height(height);
			      
			      field.find(".add").addClass("over");
			    }
			    
			  },
			  out: function(e, ui) {
			    reset();
			  }
			});

		});
	};
	

})(jQuery);