
"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAppContext } from '@/contexts/AppContext';
import { AssociationLogoPlaceholder } from '@/components/icons/AssociationLogoPlaceholder';
import { SchoolLogoPlaceholder } from '@/components/icons/SchoolLogoPlaceholder';
import { Users, Award, X, CalendarDays } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useState } from 'react';

export default function HomePage() {
  const { logos, votingSettings, fybWeekSettings } = useAppContext();
  const [showVotingInactiveDialog, setShowVotingInactiveDialog] = useState(false);
  const [showFybWeekInactiveDialog, setShowFybWeekInactiveDialog] = useState(false);

  const fybWeekButton = (
    <Button
      asChild={fybWeekSettings.isFybWeekActive}
      variant="outline"
      size="lg"
      className="font-headline text-lg py-6 shadow-sm transition-all hover:scale-105 w-full justify-center hover:bg-muted"
      onClick={!fybWeekSettings.isFybWeekActive ? () => setShowFybWeekInactiveDialog(true) : undefined}
    >
      {fybWeekSettings.isFybWeekActive ? (
        <Link href="/fyb-week">
          <CalendarDays className="mr-4 h-6 w-6 text-primary" />
          FYB Week
        </Link>
      ) : (
        <span className="flex items-center">
          <CalendarDays className="mr-4 h-6 w-6 text-muted-foreground" />
          FYB Week
        </span>
      )}
    </Button>
  );

  const votingButton = (
    <Button
      asChild={votingSettings.isVotingActive}
      variant="outline"
      size="lg"
      className={`font-headline text-lg py-6 shadow-sm transition-all hover:scale-105 w-full justify-center ${
        votingSettings.isVotingActive
          ? 'border-green-500 text-green-500 hover:bg-green-500/10 hover:text-green-600'
          : 'border-gray-300 text-muted-foreground hover:bg-muted'
      }`}
      onClick={!votingSettings.isVotingActive ? () => setShowVotingInactiveDialog(true) : undefined}
    >
      {votingSettings.isVotingActive ? (
        <Link href="/vote">
          <Award className="mr-4 h-6 w-6 text-green-500" />
          Award Voting
        </Link>
      ) : (
        <span className="flex items-center">
          <Award className="mr-4 h-6 w-6 text-muted-foreground" />
          Award Voting
        </span>
      )}
    </Button>
  );

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-br from-background to-secondary/30 px-4 py-8 sm:px-8 sm:py-12">
       <AlertDialog open={showVotingInactiveDialog} onOpenChange={setShowVotingInactiveDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Voting Not Yet Open</AlertDialogTitle>
            <AlertDialogDescription>
              The voting session has not started yet. Please check back later for updates.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
             <Button variant="outline" onClick={() => setShowVotingInactiveDialog(false)}>
                <X className="mr-2 h-4 w-4" /> Close
              </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={showFybWeekInactiveDialog} onOpenChange={setShowFybWeekInactiveDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Coming Soon!</AlertDialogTitle>
            <AlertDialogDescription>
              The FYB Week schedule is not yet available. Please check back later.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
             <Button variant="outline" onClick={() => setShowFybWeekInactiveDialog(false)}>
                <X className="mr-2 h-4 w-4" /> Close
              </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Card className="w-full max-w-2xl shadow-2xl rounded-xl overflow-hidden">
        <CardHeader className="bg-primary text-primary-foreground p-8 text-center">
          <div className="flex flex-row items-center justify-center gap-6 mb-6">
            <div className="w-24 h-24 md:w-32 md:h-32 bg-primary-foreground/20 rounded-full p-2 flex items-center justify-center">
              {logos.associationLogo ? (
                <Image src={logos.associationLogo} alt="Association Logo" width={128} height={128} className="object-contain rounded-full" unoptimized />
              ) : (
                <AssociationLogoPlaceholder className="w-full h-full text-primary-foreground" />
              )}
            </div>
            <div className="w-24 h-24 md:w-32 md:h-32 bg-primary-foreground/20 rounded-full p-2 flex items-center justify-center">
              {logos.schoolLogo ? (
                <Image src={logos.schoolLogo} alt="School Logo" width={128} height={128} className="object-contain rounded-full" unoptimized />
              ) : (
                <SchoolLogoPlaceholder className="w-full h-full text-primary-foreground" />
              )}
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-headline tracking-tight">
            Cyber Clan
          </h1>
          <p className="text-lg md:text-xl font-body text-primary-foreground/80 mt-2">
            Nigerian Association of Computing Students (NACOS)
          </p>
          <p className="text-md font-body text-primary-foreground/70">
            Federal University Lokoja Chapter
          </p>
        </CardHeader>
        <CardContent className="p-8 md:p-12 text-center">
          <div className="flex flex-col gap-6">
            <Button asChild size="lg" className="font-headline text-lg py-8 bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg transition-transform hover:scale-105">
              <Link href="/fyb-students">
                <Users className="mr-3 h-6 w-6" />
                Meet the Cyber Clan
              </Link>
            </Button>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {fybWeekButton}
              {votingButton}
            </div>
          </div>
        </CardContent>
      </Card>
      <footer className="mt-12 text-center space-y-4">
        <ThemeToggle />
        <p className="text-sm text-muted-foreground font-body">
          &copy; 2025 NACOS. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
