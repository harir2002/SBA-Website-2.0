/**
 * JobDetailPage — /careers/:slug
 */

import { useEffect } from 'react'
import { Link, Navigate, useLocation, useParams } from 'react-router-dom'
import { MapPin } from 'lucide-react'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import JobApplicationForm from '../components/careers/JobApplicationForm'
import usePageMeta from '../hooks/usePageMeta'
import { formatOpenings, getJobBySlug } from '../data/careers/jobs'

export default function JobDetailPage() {
  const { slug } = useParams()
  const location = useLocation()
  const job = getJobBySlug(slug)

  usePageMeta({
    title: job
      ? `${job.title} | Careers | SBA Info Solutions`
      : 'Role | Careers | SBA Info Solutions',
    description: job?.summary || '',
    path: job ? `/careers/${job.slug}` : '/careers',
  })

  useEffect(() => {
    if (location.hash === '#apply') {
      requestAnimationFrame(() => {
        document.getElementById('apply')?.scrollIntoView({ behavior: 'smooth' })
      })
      return
    }
    window.scrollTo(0, 0)
  }, [slug, location.hash])

  if (!job) {
    return <Navigate to="/careers#open-roles" replace />
  }

  const metaItems = [
    { label: 'Department', value: job.department },
    { label: 'Openings', value: formatOpenings(job.openings) },
    { label: 'Experience', value: job.experience },
    { label: 'Location', value: job.location },
    { label: 'Work mode', value: job.workMode },
    { label: 'Employment', value: job.employmentType },
  ]

  return (
    <div className="relative min-h-screen bg-black text-white">
      <Header />
      <main>
        <article className="page-hero bg-black pb-12 sm:pb-16">
          <div className="mx-auto max-w-[800px] px-5 sm:px-6 lg:px-10">
            <p className="font-heading text-xs font-bold tracking-[0.22em] text-primary-red uppercase">
              {job.department}
            </p>
            <h1 className="mt-4 font-heading text-[1.85rem] font-extrabold leading-[1.15] tracking-tight text-white sm:text-4xl">
              {job.title}
            </h1>
            <p className="mt-4 font-body text-base leading-[1.6] text-white/70">{job.summary}</p>

            <dl className="mt-8 grid gap-4 sm:grid-cols-2">
              {metaItems.map((item) => (
                <div key={item.label} className="border border-white/10 px-4 py-3">
                  <dt className="font-heading text-[11px] font-bold tracking-wide text-white/45 uppercase">
                    {item.label}
                  </dt>
                  <dd className="mt-1 flex items-center gap-1.5 font-body text-sm text-white">
                    {item.label === 'Location' ? (
                      <MapPin className="h-3.5 w-3.5 text-primary-red" aria-hidden="true" />
                    ) : null}
                    {item.value}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#apply"
                className="inline-flex items-center justify-center rounded-md bg-primary-red px-6 py-3 font-heading text-sm font-bold tracking-wide text-white uppercase transition-[filter] hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Apply for this Role
              </a>
              <Link
                to="/careers#open-roles"
                className="inline-flex items-center font-heading text-sm font-semibold text-white underline-offset-4 hover:text-primary-red hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-red"
              >
                ← Back to open roles
              </Link>
            </div>
          </div>
        </article>

        <div className="mx-auto max-w-[800px] space-y-12 px-5 pb-16 sm:px-6 lg:px-10">
          <section aria-labelledby="responsibilities-heading">
            <h2
              id="responsibilities-heading"
              className="font-heading text-xl font-extrabold tracking-tight text-white"
            >
              Key responsibilities
            </h2>
            <ul className="mt-4 list-disc space-y-2.5 pl-5 font-body text-base leading-[1.6] text-white/80">
              {job.responsibilities.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="skills-heading">
            <h2
              id="skills-heading"
              className="font-heading text-xl font-extrabold tracking-tight text-white"
            >
              Preferred skills
            </h2>
            <ul className="mt-4 list-disc space-y-2.5 pl-5 font-body text-base leading-[1.6] text-white/80">
              {job.preferredSkills.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="education-heading">
            <h2
              id="education-heading"
              className="font-heading text-xl font-extrabold tracking-tight text-white"
            >
              Education / certification
            </h2>
            <p className="mt-4 font-body text-base leading-[1.6] text-white/80">{job.education}</p>
          </section>

          <section aria-labelledby="benefits-heading">
            <h2
              id="benefits-heading"
              className="font-heading text-xl font-extrabold tracking-tight text-white"
            >
              Benefits
            </h2>
            <p className="mt-4 font-body text-base leading-[1.6] text-white/80">{job.benefits}</p>
          </section>

          <section
            id="apply"
            className="scroll-mt-28 border border-white/15 p-5 sm:p-8"
            aria-label="Application form"
          >
            <JobApplicationForm job={job} />
          </section>
        </div>
      </main>
      <Footer />
    </div>
  )
}
