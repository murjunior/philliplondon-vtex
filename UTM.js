var phillipLondon = phillipLondon || {};
phillipLondon.methods = phillipLondon.methods || {}
phillipLondon.methods.getUtms = function(){
  var IPS = Cookies.get('IPS');
  var utms = {
    source: (IPS.indexOf('Parceiro')!= -1 ? IPS.split('Parceiro=')[1].split('&')[0]:null),
    campaign: (IPS.indexOf('Campanha')!= -1 ? IPS.split('Campanha=')[1].split('&')[0]:null),
    medium: (IPS.indexOf('Midia')!= -1 ? IPS.split('Midia=')[1].split('&')[0]:null)    
  }
  return utms;
};
phillipLondon.methods.setUtmsOrderForm = function(){
  var utms = this.getUtms();
  if (utms.source == undefined && utms.campaign == undefined && utms.medium == undefined) return;
 
  vtexjs.checkout.getOrderForm().then(function(o) {
    var marketingData = o.marketingData;
    
    if ( marketingData != undefined && marketingData.utmSource != null ) return;
    
    marketingData = {
  	  utmSource: utms.source,
  	  utmCampaign: utms.campaign,
  	  utmMedium: utms.medium
    };
 
    return vtexjs.checkout.sendAttachment('marketingData', marketingData)
  }).done(function(){
    console.log("MarketingData atualizado", vtexjs.checkout.orderForm.marketingData);
  });
};
phillipLondon.methods.setUtmsOrderForm();
