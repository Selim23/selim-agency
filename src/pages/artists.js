import React from 'react'
import { useStaticQuery, graphql } from "gatsby"

import Layout from "../components/Layout"
import SEO from "../components/Seo"
import { Wrapper, Image, BottomEdgeDown, BottomEdgeUp, Artist } from "../pageStyles/pageStyles"
import { COLORS } from '../constants'

const ArtistsPage = () => {
    const {
        wpcontent: {
            page: { artistsPageMeta: {
                artistsPageDescription,
                artistsPageHeaderPicture

            }, },
            artists: {
                edges: artists
            }
        },
    } = useStaticQuery(graphql`
    query{
      wpcontent {
        page(id: "artists", idType: URI) {
          artistsPageMeta {
            artistsPageDescription
            artistsPageHeaderPicture {
              sourceUrl
              imageFile {
                childImageSharp {
                  fluid(quality: 100) {
                    ...GatsbyImageSharpFluid_withWebp
                  }
                }
              }
              altText
            }
          }
        }
        artists {
          edges {
            node {
              artistsMeta {
                firstName
                lastNameKopie
                artistName
                profile {
                  altText
                  sourceUrl
                  imageFile {
                    childImageSharp {
                      fluid(quality: 50, grayscale: true) {
                        ...GatsbyImageSharpFluid_withWebp
                      }
                    }
                  }
                }
              }
              slug
            }
          }
        }
      }
    }
  `);
    return (
        <Layout>
            <SEO title="Artists" />
            <Wrapper artistsColor={COLORS.BLACK} descriptionColor={COLORS.SECONDARY} >
                <div className="banner">
                    <Image fluid={artistsPageHeaderPicture.imageFile.childImageSharp.fluid} />
                    <BottomEdgeDown color={COLORS.SECONDARY} />
                </div>
                <div className="description">
                    <h2>We are Kaygun Agency</h2>
                    <p>{artistsPageDescription}</p>
                    <BottomEdgeUp color={COLORS.BLACK} />
                </div>
                <div className="artists">
                    <h2>Our Artists</h2>
                    <div className="artist-item">
                        {artists.map(({ node: { artistsMeta, slug } }) => (
                            <Artist to={`/${slug}`} key={slug}>
                                <Image
                                    fluid={artistsMeta.profile.imageFile.childImageSharp.fluid}
                                    
                                />
                                <div className="artist-info">
                                    <p>
                                        {artistsMeta.firstName} {artistsMeta.lastName}
                                    </p>
                                    {artistsMeta.artistName && <p>{artistsMeta.artistName}</p>}
                                </div>
                            </Artist>
                        ))}

                    </div>

                </div>
            </Wrapper>
        </Layout>
    )
}

export default ArtistsPage