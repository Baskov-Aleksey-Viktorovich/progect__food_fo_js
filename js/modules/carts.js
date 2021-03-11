function carts(){
        class MenuCart{
            constructor(src, alt, title, descr, price, parentSelector, ...classes){
                this.src = src ;
                this.alt = alt;
                this.title = title;
                this.descr = descr;
                this.price = price;
                this.classes = classes;
                this.transfer = 27;
                this.parent = document.querySelector(parentSelector);
                this.changeToUAH();
            }
        changeToUAH(){
            this.price = this.price * this.transfer;
        }
        render (){
                const element = document.createElement('div');
                if (this.classes.length === 0){
                    this.element = 'menu_item';
                    element.classList.add(this.element);
                }else{
                    this.classes.forEach(className => element.classList.add(className));
                }
                
                        element.innerHTML = ` <div class="menu__item">
                        <img src=${this.src} alt=${this.alt}>
                        <h3 class="menu__item-subtitle">${this.title}</h3>
                        <div class="menu__item-descr">${this.descr}</div>
                        <div class="menu__item-divider"></div>
                        <div class="menu__item-price">
                            <div class="menu__item-cost">Цена:</div>
                            <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                        </div>
                    </div>
                    `;
                    this.parent.append(element);
        }
    
        }
        const  getResource = async (url)=> { 
            const res = await fetch(url);
            if(!res.ok){
            throw new Error(`Could not fetch ${url}, status:${res.status}`);   
            }
            
            return await res.json();
            
        };

    /*          getResource('http://localhost:3000/menu')
        .then(data => {
            data.forEach(({img, altimg, title, descr, price}) => {
                new MenuCart(img, altimg, title, descr, price, '.menu .container').render();
                });
        });  */
        axios.get('http://localhost:3000/menu')
        .then(data => {data.data.forEach(({img, altimg, title, descr, price}) => {
            new MenuCart(img, altimg, title, descr, price, '.menu .container').render();
        });
        });
        //way#2
        /*    getResource('http://localhost:3000/menu')
        .then(data => createCart(data));
        function createCart (data){
            data.forEach(({img, altimg, title, descr, price}) =>{
                const element = document.createElement('div');
                element.classList.add('menu__item');
                element.innerHTML = `
                <div class="menu__item">
                <img src=${img} alt=${altimg}>
                <h3 class="menu__item-subtitle">${title}</h3>
                <div class="menu__item-descr">${descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${price}</span> грн/день</div>
                </div>
            </div>
                `;
                document.querySelector('.menu .container').append(element);
            }); 
        }*/
}
module.exports = carts;