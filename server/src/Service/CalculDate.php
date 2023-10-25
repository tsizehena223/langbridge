<?php

namespace App\Service;

class CalculDate
{
    public function formatDate($dateString)
    {
        $givenDate = new \DateTime($dateString);
        $currentDate = new \DateTime();

        $interval = $currentDate->diff($givenDate);

        return $this->formatDifference($interval);
    }

    private function formatDifference($interval)
    {
        if ($interval->y > 1) {
            return $interval->format('%y years ago');
        } elseif ($interval->y > 0) {
            return $interval->format('%y year ago');
        } elseif ($interval->m > 1) {
            return $interval->format('%m months ago');
        } elseif ($interval->m > 0) {
            return $interval->format('%m month ago');
        } elseif ($interval->d > 1) {
            return $interval->format('%d days ago');
        } elseif ($interval->d > 0) {
            return $interval->format('%d day ago');
        } elseif ($interval->h > 1) {
            return $interval->format('%h hours ago');
        } elseif ($interval->h > 0) {
            return $interval->format('%h hour ago');
        } else {
            return "less than 1 hour";
        }
    }
}
