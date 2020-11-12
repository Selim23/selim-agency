import React from 'react'
import { Link, useStaticQuery, graphql } from "gatsby"

import Layout from "../components/Layout"
import SEO from "../components/Seo"
import { Wrapper, Image, BottomEdgeDown, BottomEdgeUp, Artist } from "./pageStyles/pageStyles"
import { COLORS } from '../constants'

const ArtistsPage = () => {
    const {
        wpcontent: {
            pageBy: { artistsPageMeta: {
                artistsPageDescription,
                artistsPageHeaderPicture

            }, },
            artists: {
                edges: artists
            },
        },
    } = useStaticQuery(graphql`
    query{
        wpcontent{
            pageBy(uri: "artists") {
          artistsPageMeta {
            artistsPageDescription
            artistsPageHeaderPicture {
                sourceUrl
                imageFile {
                  childImageSharp {
                    fluid(quality:100, grayscale: true){
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
                        fluid(quality:100, grayscale: true){
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
      
    `)

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
                        {artists.map(({ node: { artist, slug } }) => (
                            <Artist to={`/${slug}`} key={slug}>
                                <Image
                                    fluid={artist.profile.imageFile.childImageSharp.fluid}
                                    alt={artist.profile.altText}
                                />
                                <div className="artist-info">
                                    <p>
                                        {artist.firstName} {artist.lastName}
                                    </p>
                                    {artist.artistName && <p>{artist.artistName}</p>}
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