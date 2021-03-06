import React from 'react';
import {  useStaticQuery, graphql } from "gatsby"

import Layout from "../components/Layout"
import SEO from "../components/Seo"
import { Wrapper, Image, BottomEdgeDown, BottomEdgeUp } from "../pageStyles/pageStyles"
import { COLORS } from '../constants'

const AboutUsPage = () => {
    const {
        wpcontent: {
            pageBy: {
                aboutUsMeta: { aboutUsPageDescription, aboutUsPageHeaderPicture },
            },
        },
    } = useStaticQuery(graphql`
    query{
        wpcontent{
            pageBy(uri: "about-us") {
          aboutUsMeta {
            aboutUsPageDescription
            aboutUsPageHeaderPicture {
                  
              altText
              sourceUrl
              imageFile {
                childImageSharp {
                  fluid(quality:100, grayscale: true){
                    ...GatsbyImageSharpFluid_withWebp
                  }
                }
              }
              
            }
          }
        }
        }
      
      }
      
    `)

    return (
        <Layout>
            <SEO title="About Us" />
            <Wrapper descriptionColor={COLORS.PRIMARY}  >
                <div className="banner">
                    <Image fluid={aboutUsPageHeaderPicture.imageFile.childImageSharp.fluid} alt={aboutUsPageHeaderPicture.altText} />
                    <BottomEdgeDown color={COLORS.PRIMARY} />

                </div>
                <div className="description">
                    <h2>About Us</h2>
                    <p>{aboutUsPageDescription}</p>
                    <BottomEdgeUp color={COLORS.BLACK} />
                </div>
            </Wrapper>

        </Layout>

    )
}
export default AboutUsPage