import React from 'react';

import { Section, SectionText, SectionTitle } from '../../styles/GlobalComponents';
import Button from '../../styles/GlobalComponents/Button';
import { LeftSection } from './HeroStyles';

const Hero = () => (
  <Section>
    <LeftSection>
      <SectionTitle main center>
        Hello, my name is Ivan <br />
        Welcome to my portfolio!
      </SectionTitle>
      <SectionText>
        I am a college student, currently studying Computer Science at Towson University.
        As a self-taught developer, and I am always looking for new challenges to learn new technologies.
      </SectionText>
      <Button onClick={() => window.location = 'https://google.com'}>To google.com</Button>
    </LeftSection>
  </Section>
);

export default Hero;