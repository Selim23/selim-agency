import React from "react"
import { useStaticQuery,graphql } from "gatsby"

import Layout from "../components/Layout"
import SEO from "../components/Seo"
import {Wrapper,Image,Artist,BottomEdgeDown,BottomEdgeUp} from "../pageStyles/pageStyles"
import {COLORS} from '../constants'

const IndexPage = () => {
  const {
    wpcontent: {
      page: {
        homeMeta: {
          homePageDescription,
          homePageFeaturedArtists,
          homePageHeaderDescription,
          homePageHeaderPicture,
          homePageHeaderTitle,
        }
      }
    }
  } = useStaticQuery(graphql`
  query {
    wpcontent {
      page(id: "home", idType: URI) {
        homeMeta {
          homePageDescription
          homePageFeaturedArtists {
            ... on WPGraphql_Artist {
              slug
              id
              artistsMeta {
                artistName
                firstName
                lastNameKopie
                profile {
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
          homePageHeaderDescription
          homePageHeaderPicture {
            altText
            sourceUrl
            imageFile {
              childImageSharp {
                fluid(quality:50){
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
          homePageHeaderTitle
        }
      }
    }
  }
`);

 return( 
 <Layout>
    <SEO title="Home" />
    <Wrapper>
      <div className="banner">
        <Image 
        fluid={homePageHeaderPicture.imageFile.childImageSharp.fluid} 
        alt={homePageHeaderPicture.altText} /> 
        <div className="inner-div">
          <p className="header-title"> {homePageHeaderTitle} </p>
          <p className="header-description">{homePageDescription}</p>
        </div>
        <BottomEdgeDown color={COLORS.BLACK}></BottomEdgeDown>
      </div>
      <div className="description"  >
         <p>{homePageDescription}</p>
         <BottomEdgeUp color={COLORS.PRIMARY} />

      </div>
      <div className="artists">
        <h2>Featured Artists</h2>
        <div className="artist-items">
        {homePageFeaturedArtists.map(({ artistsMeta, slug }) => (
              <Artist to={`/${slug}`}>
                <Image fluid={artistsMeta.profile.imageFile.childImageSharp.fluid} />
                <div className="artist-info">
        <p>{artistsMeta.firstName} {artistsMeta.lastNameKopie}</p>
        <p>{artistsMeta.artistName}</p>
                </div>
              </Artist>
            ))}
        </div>
      </div>

    </Wrapper>
  </Layout>
 )}

export default IndexPage
