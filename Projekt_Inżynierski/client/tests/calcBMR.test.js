import React from 'react';
import { shallow } from 'enzyme'; 
import Calc from '../src/components/Calc'; 

describe('calculateBMR function', () => {
    it('calculates BMR correctly for male', () => {
      const wrapper = shallow(<Calc />);
  
      // Symuluj dane wejściowe
      wrapper.find('input').at(0).simulate('change', { target: { value: 70 } }); // Symuluj zmianę wagi
      wrapper.find('input').at(1).simulate('change', { target: { value: 175 } }); // Symuluj zmianę wzrostu
      wrapper.find('input').at(2).simulate('change', { target: { value: 30 } }); // Symuluj zmianę wieku
      wrapper.find('select').at(0).simulate('change', { target: { value: 'male' } }); // Symuluj zmianę płci
      wrapper.find('select').at(1).simulate('change', { target: { value: 1.5 } }); // Symuluj zmianę poziomu aktywności
      wrapper.find('select').at(2).simulate('change', { target: { value: 'lose' } }); // Symuluj zmianę celu
  
      // Symuluj kliknięcie w przycisk
      wrapper.find('button').simulate('click');
  
      // Pobierz wyniki z propsów komponentu
      const resultText = wrapper.find('.result').text();

    // Oczekuj, że wynik zawiera liczbę (możesz dostosować to do swojego formatu wyświetlania)
    expect(resultText).toContain('Twoje BMR wynosi: 2037');

    const macrosText = wrapper.find('.macros').text();

    // Oczekuj, że wynik zawiera informacje o makroskładnikach (możesz dostosować to do swojego formatu wyświetlania)
    expect(macrosText).toContain('Makroskładniki:');
    expect(macrosText).toContain('Białko: 76g (14.9%)');
    expect(macrosText).toContain('Węglowodany: 280g (55.0%)');
    expect(macrosText).toContain('Tłuszcze: 68g (30.0%)');
    });
  });
