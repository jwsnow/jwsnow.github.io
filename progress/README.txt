Practice Progress Instructor Dashboard

This is a static, local-only dashboard for progress files exported from:
- Statistics Practice Center
- Texas Certification Practice Portal (subjects remain separate)
- TExES Mathematics 7–12 Practice Center
- Real Analysis Practice Center
- Grade 7 STAAR RLA Practice Center

Open index.html from the same kind of static web server you use for the practice sites. No server-side storage is required.

STUDENT IMPORTS
- Student name is required in exported files.
- Student ID is clearly optional. When supplied, it is used to distinguish students who have the same name.
- Names are normalized for capitalization and extra spaces.
- Each student may have multiple site/subject records.
- A newer export for the same student and same site/subject replaces that older record. Other site/subject records for the student are preserved.
- Texas Certification subjects are separate records, and each subject's individual test/activity history remains visible in the student detail view.

LOCAL STORAGE
The dashboard stores imported data in the browser under:
practiceInstructorDashboard.v1

Students can be deleted individually or in groups. Use the checkboxes beside students, Select all shown, Clear selection, and Delete selected. 'Select all shown' respects the current site filter and student search. Deletion immediately recomputes the aggregate tables. Student identity can also be edited; matching records can be merged when needed.

BACKUP / RESTORE
Use Export instructor backup regularly. It downloads one plain JSON file containing the complete instructor dashboard data.

Restore modes:
- Merge with current data: keeps the newer site/subject record when both copies contain the same student and site.
- Replace all current dashboard data: replaces the current browser database with the selected backup.

Backups are validated before they are restored.

PRIVACY
All imported student information remains in the browser's local storage. This dashboard does not upload progress to a server.
