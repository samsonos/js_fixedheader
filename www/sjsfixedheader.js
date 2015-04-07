/**
 * SamsonJS FixedHeader plugin 
 */
var SamsonJSFixedHeader = 
{
    /**
     * Function to make
     *
     * @param headerSelector Fixed element selector
     * @param bodySelector None fixed part of DOM tree, it'll be removed
     * @param headerElementsBorder Header inner elements border width.
     * By default it's supposed that all inner elements are 'display: table-cell' so the parameter value is 1
     */
	fixedHeader : function(headerSelector, bodySelector)
	{
		// Указатель на самого себя
		var _self = this;

		/* Initialize plugin */
		var init = function()
		{	
			// Destroy all old clones
			s('.__fixedHeaderClone').remove();
			
			// Parent
			var parent = _self.parent();

            // Header element
            var headerElement = s(headerSelector, _self);
			
			// Если есть элементы DOM в выборке
			if ( _self.length && _self.height() > parent.height() && _self.width() <= parent.width())
			{
				// Clone whole table
				var _clone = _self.clone();	
				
				// Mark clone with special class
				_clone.addClass('__fixedHeaderClone');
				
                //// Get cloned table header
                var cloneHeaderElement = s(headerSelector, _clone);

                // Remove none-static body
                s(bodySelector, _clone).remove();
				
				// Set table auto width
				_clone.css('width','auto');	
				_clone.css('top',_self.offset().top+'px');

                // Get all child elements
                var children = s('*', headerElement);
                var cloneChildren = s('*', cloneHeaderElement);

                for (var i = 0; i < children.length; i++) {

                    // TODO: Following logic can be improved
                    // If inner elements have border
                    var border = parseInt(children.elements[i].css('borderLeftWidth')) +
                        parseInt(children.elements[i].css('borderRightWidth'));
                    // If inner elements are table elements
                    if (children.elements[i].css('display') === 'table-cell') {
                        border = Math.max(parseInt(children.elements[i].css('borderLeftWidth')),
                            parseInt(children.elements[i].css('borderRightWidth')));
                    }
                    // Set fixed element width
                    cloneChildren.elements[i].css('width', children.elements[i].width() + border + 'px');
                }
						
				// Append clone to document
				parent.append(_clone);			
				
				// Добавим класс для правильного отображения
				_clone.addClass('sjs-fixedheader');			
				
				// Повесим событие на отображение клона при скроле окна
				s(window).bind({
					EventName: 'scroll',
					EventHandler: function(obj, options, e)
					{
						//_clone.show(); 
					}		
				});
			}	
		};
		
		// Init plugin
		init();
		
		// Set window resize handler
		s(window).resize(init);
	}
};

// Добавим плагин к SamsonJS
SamsonJS.extend( SamsonJSFixedHeader );