export default {

    bind(el, binding, vnode) {
        let current = 0;

        el.addEventListener('dblclick', function () {
            let increment = binding.value || 90;
            let efect;

            if (!binding.arg || binding.arg === 'rotate') 
            {
                binding.modifiers.reverse ? current -= increment : current += increment;

                efect = `rotate(${current}deg)`;
            }
            else if(binding.arg === 'scale') 
            {
              efect = `scale(${increment})`;
            }

            el.style.transform = efect;
            
            if (binding.modifiers.animate) 
            {
                el.style.transition = 'transform 0.5s';
            }
        });
    }
};