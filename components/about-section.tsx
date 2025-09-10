export function AboutSection() {
  return (
    <section id="about" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="text-4xl md:text-5xl font-heading font-black text-foreground mb-6">
              About <span className="text-primary">MX2Twins</span>
            </h2>
            <div className="space-y-6 text-lg text-muted-foreground">
              <p>
                We are MX2Twins, an up-and-coming rap duo ready to make our mark on the music industry. Born from the
                streets but refined through dedication, we bring authentic energy and professional artistry to every
                track.
              </p>
              <p>
                Our unique twin dynamic creates a sound that's both powerful and harmonious. We've been grinding,
                perfecting our craft, and building our fanbase across social media platforms. Now we're ready for that
                next big break.
              </p>
              <p>
                From freestyle sessions in the neighborhood to professional studio recordings, our journey represents
                the hustle and determination that defines real hip-hop. We're not just making music – we're telling our
                story and connecting with people who share our passion.
              </p>
            </div>
            <div className="mt-8 grid grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-heading font-bold text-primary mb-2">Our Style</h3>
                <p className="text-muted-foreground">
                  Authentic street rap with modern production, twin harmonies, and raw energy
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-heading font-bold text-primary mb-2">Our Goal</h3>
                <p className="text-muted-foreground">
                  To break into the mainstream while staying true to our roots and community
                </p>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="grid grid-cols-1 gap-6">
              <img src="/images/mx2twins-street.jpg" alt="MX2Twins Street Photo" className="rounded-lg shadow-xl" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
