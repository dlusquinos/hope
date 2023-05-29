var utilidades = {
	
	i18n: function(label) {
		let locale = this.existsLocale(this.getLocale()) ? this.getLocale() : "en";
		let text = etiqueta[locale][label] ? etiqueta[locale][label] : "N/A"
		
		return text;
	},
	
	getLocale: function() {
		return navigator.language.substring(0,2);
	},
	
	existsLocale: function(locale) {
		return etiqueta[locale] != null;
	},
	
	translateLabels: function() {
		let elements = $('.i18n');
		for(var i=0; i<elements.length; i++) {
			var elto = elements[i];
			var label=$(elto).data('i18n');
			
			var texto = this.i18n(label);
			$(elto).text(texto);
		}
	}
	
	
	
}