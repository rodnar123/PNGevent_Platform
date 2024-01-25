import CheckoutButton from "@/components/shared/CheckoutButton";
import Collection from "@/components/shared/Collection";
import {
  getEventById,
  getRelatedEventsByCategory,
} from "@/lib/actions/event.actions";
import { formatDateTime } from "@/lib/utils";
import { SearchParamProps } from "@/types";
import Image from "next/image";
import React from "react";

const EventDetails = async ({
  params: { id },
  searchParams,
}: SearchParamProps) => {
  const event = await getEventById(id);

  const relatedEvents = await getRelatedEventsByCategory({
    categoryId: event.category._id,
    eventId: event._id,
    page: searchParams.page as string,
  });

  return (
    <>
      <section className="flex justify-center bg-dotted-pattern bg-contain">
        <div className="grid grid-cols-1 md:grid-cols-2 2xl:max-w-7xl bg-blue-950 rounded-lg">
          <Image
            src={event.imageUrl}
            alt="hero image"
            width={1000}
            height={1000}
            className="h-ful min-h-[300px] object-cover object-center"
          />
          <div className="flex w-full flex-col gap-8 p-5 md:p-10">
            <div className="flex flex-col gap-6">
              <h2 className="h2-bold text-white">{event.title}</h2>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <div className="flex gap-3">
                  <p className="p-bold-20 rounded-full bg-green-500/20 px-5 py-2 text-green-500">
                    {event.isFree ? "Free" : `$${event.price}`}
                  </p>
                  <p className="p-medium-16 rounded-full bg-slate-950/20 px-4 py-2.5 text-gray-400">
                    {event.category.name}
                  </p>
                </div>
                <p className="p-medium-18 ml-2 mt-2 sm:mt-0">
                  By: {""}
                  <span className="text-primary-500">
                    {event.organizer.firstName} | {event.organizer.lastName}
                  </span>
                </p>
              </div>
            </div>

            {/* Checkout Button */}

            <CheckoutButton event={event} />

            <div className="flex flex-col gap-5">
              <div className="flex gap-2 md:gap-4">
                <Image
                  src="/assets/icons/calendar.svg"
                  alt="calender"
                  width={32}
                  height={32}
                />
                <div className="p-medium-16 lg:p-regular-18 flex flex-wrap items-center">
                  <p>
                    Starting from:{" "}
                    {formatDateTime(event.startDateTime).dateOnly} -{" "}
                    {formatDateTime(event.startDateTime).timeOnly}
                  </p>
                  <p>
                    Ending on: {formatDateTime(event.endDateTime).dateOnly} -{" "}
                    {formatDateTime(event.endDateTime).timeOnly}
                  </p>
                </div>
              </div>
              <div className="p-regular-20 flex items-center gap-3">
                <Image
                  src="/assets/icons/location.svg"
                  alt="location"
                  width={32}
                  height={32}
                />
                <p className="p-regular-16 lg:p-regular-20">{event.location}</p>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <p className="p-bold-20 text-white">What you like</p>
              <p className="p-medium-16 lg:p-regular-18">{event.description}</p>
              <a
                className="p-medium-16 lg:p-regular-18 truncate text-primary"
                href={event.url}
              ></a>
              {/* <p className="p-medium-16 lg:p-regular-18 truncate text-primary underline cursor-pointer">
              {event.url}
            </p> */}
            </div>
          </div>
        </div>
      </section>
      {/* EVENTS FROM THE SAME CATEGORY */}

      <section className="wrapper my-8 flex flex-col gap-8 md:gap-12">
        <h2>Related Events</h2>
        <Collection
          data={relatedEvents?.data}
          emptyTitle="No events found"
          emptyStateSubtext="Come back later"
          collectionType="All_Events"
          limit={6}
          page={1}
          totalPages={2}
        />
      </section>
    </>
  );
};

export default EventDetails;
