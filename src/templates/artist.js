import React from 'react';
import { graphql } from 'gatsby';
import Layout from "../components/Layout"
import SEO from "../components/Seo"
import { Wrapper, Image } from '../templates/templateStyles/artistStyles'

const ArtistTemplate = ({ data: { wpcontent: { artist: { artistsMeta, roles: { edges: roles } } } } }) => {
    const { pictures1, pictures2, pictures3 } = artistsMeta.pictures
    const pictures = [pictures1, pictures2, pictures3]
    console.log(artistsMeta)

    return (
        <Layout>
        <SEO title="Artist" />
        <Wrapper>
          <div className="artist-container">
            <div className="artist-image">
              <Image
                fluid={artistsMeta.profile.imageFile.childImageSharp.fluid}
                alt={artistsMeta.profile.altText}
              />
              <div className="roles">
                {roles.map(({ node: role }) => (
                  <div key={role.name} className="role">
                    {role.name}
                  </div>
                ))}
              </div>
            </div>
            <div className="artist-info">
              <h2>
                {artistsMeta.firstName} {artistsMeta.lastName}
              </h2>
              {artistsMeta.artistName ? (
                <h3>
                  <span>{artistsMeta.artistName} -</span> <span>{artistsMeta.locale}</span>
                </h3>
              ) : (
                <h3>{artistsMeta.locale}</h3>
              )}
              <p className="description">{artistsMeta.description}</p>
              <p className="info">
                <strong>Email:</strong> {artistsMeta.email}
              </p>
              <p className="info">
                <strong>Phone:</strong> {artistsMeta.phone}
              </p>
              <p className="info">
                <strong>Height:</strong> {artistsMeta.height}
              </p>
              <p className="info">
                <strong>Shoe size:</strong> {artistsMeta.shoeSize}
              </p>
            </div>
          </div>
          <div className="artist-pictures">
          {pictures.map((picture, i) => (
            <div key={i} className="artist-picture">
              <Image
                fluid={picture.imageFile.childImageSharp.fluid}
                alt={picture.altText}
              />
            </div>
          ))}
        </div>
        </Wrapper>
      </Layout>
    )

}

export default ArtistTemplate

export const pageQuery = graphql`
  query($id: ID!) {
    wpcontent {
      artist(id: $id, idType: ID) {
        roles {
          edges {
            node {
              name
            }
          }
        }
        id
        artistsMeta {
          artistName
          description
          email
          firstName
          height
          lastNameKopie
          locale
          phone
          pictures {
            pictures1 {
              altText
              sourceUrl
              imageFile {
                childImageSharp {
                  fluid(quality:75, grayscale: true){
                    ...GatsbyImageSharpFluid_withWebp
                  }
                }
              }
            }
            pictures2 {
              altText
              sourceUrl
              imageFile {
                childImageSharp {
                  fluid(quality:75, grayscale: true){
                    ...GatsbyImageSharpFluid_withWebp
                  }
                }
              }
            }
            pictures3 {
              altText
              sourceUrl
              imageFile {
                childImageSharp {
                  fluid(quality:75, grayscale: true){
                    ...GatsbyImageSharpFluid_withWebp
                  }
                }
              }
            }
          }
          profile {
            altText
            sourceUrl
            imageFile {
              childImageSharp {
                fluid(quality:75, grayscale: true){
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
        }
      }
    }
  }
`