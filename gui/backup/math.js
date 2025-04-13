
var sqrtIMG="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHYAAACZCAQAAABQvAbNAAAAAmJLR0QAAKqNIzIAAAAJcEhZcwAAAEgAAABIAEbJaz4AAAPKSURBVHja7Z0xstowEIb/lyvkEDmBz8ENUlFl0jKTC3ACt2loUoWZFK8hNT21a2qfQSmYF5DRyrbwrlcr/VTw5g1aPtv6tb8FbyhDDgA+rT0Kfh3crdQCdHC4P2yreyzVGT+Mf649ADn5XI2T/bv2AOTUe1QbZ3rq+eU9+772cDjVD87X3jJZn2uLz29rj4hNIa5myRbEFQhxNaqjV2pruVSgKZXr3nKpQ66d5WJ9rjvLpRbF9VwS103lalI+14vlYn2uG8ulDrmeLRdbFNdtOVy7krjuKleT8rmeLBfrc20slzrkerRc7LUkrm05XPvK1aTmcs06/vBDjq9rD4dT4fAqpozJFhVeFRty1PDKiipXm6rhlU0VHHJUrlZUudpUDSVtqoYcNlW52lTlalMFhZI15LCpytWmKlebWpar8mDr3XtmOpQsuBleQw4rWoFr71oH17ir+OcqzvXiPt5SelklztX7qhLhBbMwV38NKctWtBneuWZQqmxTWjDkOAYKlYwbBLnuiFLlgiQhruHDV3a2E+J6jBYqNd+JcH08fLersb3wc726++fZuM71ZLHcvQL/isFw/T8FPsuWLJezW8DeDN8HC7muwpY55Ni5x8OXfmMJ48gfcpCXgo4slss4sodXjYNriPNwQ5bLYRwFwqv+du0N6kwWyzEl7EVOlYhotksv5nuBE2WklUo3L/8sPBD/jv9vHLWOi/bKSxpHmZBjtElOf4Xf+9i/zpDP9QdPreOSMI6Kwit+46govKKN4zLXTEVcAW7jeNTDFeA2joPr/fqiF/OvdhIUhld8xlFleMVjHBVyBfxuBhYbokquzwNbYpBKuT4P7fFxSBzmRivX5Y3jWS9XIGYcU+4T9bnKh90jotnONxcZ7NBZzjhmsPOKNo7bWcPNgCuwlHHMgCuwjHHs8uAKxIzj1JlylwdX4HXjmBFX4FXjmNkOHdo4jvcZctyhk2wcM+MKpBvHHLkmG8c2P67AMHObVoJEeMWiFOOYKVcgtigI24T1ub6w+2ND/uV38NXMv15ujnFUFnLMF70oeDaOisKrVEVu6xwqb67AdOOoLLxK1iTj2OTPFYgZx/s8aoXrJOOoLpRM15hxVBxyzBdtHG9dCLXhVZpixvFkiSsQMxd7pzi8ShVtHI1xBWJszXEFosbRFldgyp4gdaHkK4qzVd8Mn6c2WqzqkGO++nK4AjG2xrgCtHE0yBWgjKNBrsBwj6RprkDIOGbVDJ+noXHMKORIUVMKV8A3jvNuGMpS2/+HsC4/zPSzL7fJ5ouyH5X5B71Z7EhATSxUAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE1LTA0LTA5VDIxOjEwOjEwLTA1OjAw1bh6agAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxNS0wNC0wOVQyMToxMDoxMC0wNTowMKTlwtYAAAAASUVORK5CYII=";
var blackboxIMG="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEkAAABMCAQAAACLt1LkAAAAAmJLR0QAAKqNIzIAAAAJcEhZcwAAAEgAAABIAEbJaz4AAACISURBVGje7dqxEUBQFETRZUR6oAsdyFXzW5KrQyAWK+RJCFDA2zH3bgOngNUWQ8hmUxzRzFrl06JRlSKb8ayoziZ8gwQJEiS3IEGCBMktSJAgQXILEiRIkNyCBAkSJLcgQYIEyS1IkCBBcgsSJEiQ3IIE6c+kki141Ut+79Pq1u3Jl89W3WU5AYLAnNyUsRG2AAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE1LTA0LTA5VDIxOjA0OjQyLTA1OjAwwqIanQAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxNS0wNC0wOVQyMTowNDo0Mi0wNTowMLP/oiEAAAAASUVORK5CYII=";
var integralIMG="data:image/png;base64,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";
var langleIMG="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB0AAABuCAMAAADs++hSAAABjFBMVEUAAAD+89OpfmleXml+qdPZnVoMAAAAAAAADG2z6vz/9cqLORHps28RAAARaLP/+tWdTyAAAECEx+/1zIw5AAAMT53Z+v7//uezaCwAAChhreH62Z1PDAAALIbH9f7Mi0gAACBPndX+6bNoEQAAEWmt5foAAAwofcEAAFKX1fQRYa3l/v///dqiUCAAADx9wuwARZjV+v64cDH93aJQDAAAKIDC8f0AABE6kc/+7bhwGQDdolwod7wAAEiR0PPtuHUZAAAAADp3vekAOpLQ+f4AKHy97fw5i8r+7bx3KAwADGKo4fnhqGKLzPDtvXwoAAAMWajh/v///t6oWSMAOYzM9f69dzpZqN7+4ahZDAAAGXW47fwADFyi3fgZcLgMUKLd/f///uStYSgAADFwuOf50JJQotr+5a1hEQAAEW+z6fvQkUsADFqd2fXlrWn/+c+ROhEAACxos+QshMb/9caELAz/8b12GQAAABlFl9P1x4YsAADHhED/8cF9KAwAEXMAAGf+7sOFQR1OhsBdysCrAAAAAXRSTlMAQObYZgAAAAFiS0dEAIgFHUgAAAAJcEhZcwAAAEgAAABIAEbJaz4AAAGxSURBVEjHndbFdsNAFANQF1VmShlTTpkhZWZmZmbm/njt6Vpv5thbnWxu/CRbFnkCAoOCLfqEhCIsnIURkRDSqGgghoWxcUB8AksTk4DkFBKmpgGedPbTjEwgK5ulOUBuHgvzC4DCIkHCWyxJlJRKEmXlJKyoBHxVkkR1DZOolSTq6oGGRkGiqZmFLa2SRJst0S5JdHSy1N+lkejukSR6+1xL9A9IEoMsHBoGRkZZOqaVGGfpxCQwNU3CmVmdxNw8SxfsV3yRhUvLwMqqa4m1dUECG+4lNrdIuL0D7O6xn+5rJQ5YeHgEHJ+w9FQncXbO0gup9i6vdBK09hyJ6xv3ErT2HAl+7LaE95aFd/eSxMOjdDtyA6ke5zcrb4DcFWp7fPS65LbW9JtaCdoImoVxRJ6eRRHe5wYidEf+RegGGYjw7ZN300CEv7iardeIvLwKx6b5PlFHzkXks3BEeLloisl604rwGpArxECEV5dce0qEj4eBCB8tJUJr3kCEz4sSodNkIkInUYkI5agX4eWoROgngIGIUI6OCP1sMRARyvH9A/jkf7Mt8sWL4vvH82v9AW+2YQclh/TVAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE1LTA0LTA5VDIxOjA1OjQwLTA1OjAwuv9gigAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxNS0wNC0wOVQyMTowNTo0MC0wNTowMMui2DYAAAAASUVORK5CYII=";
var lbraceIMG="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAABuCAMAAAB1AzHnAAACXlBMVEUAAAD78+PUw7WkloBvYF5gcaXU9f7779zHs52EZ0YjAAAAAAAAAGet5vvm0bmdfFkzDAAAABkzVXqYtdTiw6SDXjoMAAAADDpgiqfB2e3v2beQYDpgi63M5vX/++jLnWw1DAA1Z5jC4vT+89OocEUADEl3rNP/+96taDMAJWSYy+jUl1d/wef+5a1hEQAAACBOl9HMi0gAKHy97fz/9caELAwAABE6kc/92Z1GAAAAADl9wu37zIsAAGGo4voAI4vM+//0wn8dAADmrWfeolsAPJfV/P+9djMRb7gAAB1PotvtuHUZAAAADFyi3fj/99GXTiAAAAwod7zLi08AJXGz5vrUnWUlAAAADEuFxuv+99+9i1t+vOOLVy8MQHWo1fD35syti2JgkLnd8/wAAChLdp292e3mzLSYfFkAI05wkq/L4fHdolwADDVVdpGovdHm9/3Vl08jS3GRqL3Q4vH+9+TMtJh2SyiYtMzh8/uYdk92nb3Z7/rv2buWZzwAI1N+qc7evZZnNRklXpXG5vj76smdaDyd1PD/++O8fkmi2fP/++GzcDkMQYrG7vz+7sB+NRFFkc0RAAAAEW+z6fv/8b12GQAAACxos+T//+i4by8Zdr3ZnVUARp3Z/f/xvXkAHX/C9P781Zc8AAAAAFWd2fdZqN7CfTwAOYzM9f762Z1PDABZotkADFWS0O//+tqoYTGdYDGFud+5hVNOfq3U7vriw51vQB0AJVqFrczMrYtgNRkMNWKKp8HRuZ18VTVVfJm0zOTr2cezmHpVMxnm2ceznYt2XkEAKIDC8f33bOKYAAAAAXRSTlMAQObYZgAAAAFiS0dEAIgFHUgAAAAJcEhZcwAAAEgAAABIAEbJaz4AAAIBSURBVEjH7dfpX0xhFAfwa03zRFEMY0tjqimMJclaGhSGtFCGCMMYDEMGZZkWSwhpEy32rCVklyWU/qs8574+v4tXPj533t7v55znnHPnPDOKAj4DBg4aPGQo/zxoWLBBCBEynAMjQsN+PRcjR4UzIGL0GAmMY8cxwDReBRMmMmDS5EhKMSWKO4R5KoWwRLN1xMRKIKxxfKnxaoxpvJg+QwrbTNDPWZRm9hxeJMyVInEeCJI0X5IFCwFZJKciFi/RJPzk/oQkp+hEJzr5e7I0VZPYhSZZRmT5CkDSiKQDoW6glasAWe2QZM1aXmSskyIzCwTJpoWas54XG3KlyNvIAucmEpbNrDDlU71btnKgYBvdHsbtOzBw7dzFAPduuuI8e/ZyOfbJSr37D/j4Ug/Kbh0qPAz65T9yVL1KjxUB5S6ml81z/ARAJ09R7wMlwCilZTTC8tPAnDlLgazngKk4r5oLwFyspDFdugzMlSp6L6+iM9urpampBaSuXpJrDYBcv0GnaUSZmog0t6DDaH9hf4PcdPw7W0onOvnvya3bmgT+JL5zV5J79wFRd5CtFRDlAa2Gh48AefyEbqanKIz6t6WtHZBnHUJziZufkwm8AMb5kprj6nwF0Os3FOjtOx9v/O8/EPrYBS4x/6fPVJr3y1eQrvvbd82BKcqPnl7Dz75+DGuXwwSEWwIAAAAldEVYdGRhdGU6Y3JlYXRlADIwMTUtMDQtMDlUMjE6MDY6MDYtMDU6MDC2UuBJAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDE1LTA0LTA5VDIxOjA2OjA2LTA1OjAwxw9Y9QAAAABJRU5ErkJggg==";
var lbracketIMG="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAABuBAMAAAA3wjXgAAAAIVBMVEUAAADvzKaLi4uLi6bM7/zmrWcAAAAAAGet5vsAADlefYksBzWPAAAAAXRSTlMAQObYZgAAAAFiS0dEAIgFHUgAAAAJcEhZcwAAAEgAAABIAEbJaz4AAAApSURBVDjLYxBSggBlB4awNAhIb8DFBGIoGGWOMkeZo0xqMzMXEVsaAQC5IJpKHY9MygAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAxNS0wNC0wOVQyMTowNjozMi0wNTowMMySw7kAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMTUtMDQtMDlUMjE6MDY6MzItMDU6MDC9z3sFAAAAAElFTkSuQmCC";
var lparenIMG="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAABuCAMAAADlEEgoAAAB6VBMVEUAAADz2bSLcGJgebPk/v/mvINDDAAAAAAMUKLa/P/UnWUkAAAMQYO85vgAJWWd1PDbomQADE+Ly+0AADJhqNruxooAABE1d7f63ahhJQwMRY/M8/3+8ciLRR3//eO8djoAABpOkszirW0AOYvH8fwAAEB+wur//dutaDMAAAwlabIADFud2fb/7bp0KAwod7zMi0qi3vj82Z1PDAARYa1wuOf+5KtZDAA6kc//8cF9KAwAAEqS0fPlq2URAAAARp2iUCBGnddGAADZnVUAL4vM+v///NWUOxEdfcIAAFusXSMAPJbU/P9vEQD0wn8bAAAAACNXqN/TlU2iTx0AEXO47fz/8b12GQA7AAAMZ7MxkdDMi0BereKLzPP/+s6LIwBeAAAADGuz6vz61ZgAI4sAXq0Rb7jHhDwji8ytYSidRhl2vesAADuRMQzCfTkZdr3tuHP7zIv/+MeEIADeolz4x4X/6rNnDAAAACxns+Ws5Pr10JIvi8vHhED705QAAFWXRRkMAAAMWahhEQCEx+/zzI4ADGI5i8oAEWlFkc3/99GXTiA1fsD31JkADFbUl1cMTJyiWSVZotn75bMAEWGi3PXU9/7ls3UoAABBhcNws+GS0O+8fkkAJW+t4ffGkmERWqjduItXJQySDcJzAAAAAXRSTlMAQObYZgAAAAFiS0dEAIgFHUgAAAAJcEhZcwAAAEgAAABIAEbJaz4AAAJMSURBVEjHvZbrW0xRFMY3ZRaOEkNuOU1lOgaRMFGZSpmoVO7jUkmuI4ToRkyUWzLu98Jfau89H8/7fuh5epyvv2ddz7vW2kqhb8HCrGwIFgVk8RIEljqyLIeA3OUI5DmyYiWJEVyFwOqA5K9Bea1dJ7J+AwAFGwUHcQtFQkUoSLEjUrKJBAmXAuBtFolsySa+tm4DoGy7NtmBwpeLNtkJQMUuZlIoJIoxkd0gMVO9BPcAk2ilJiWolSax/L0A7KvSpLoGkP0xTWqBXLw6DUL1KOUDzFmDBtJ40A/iTYYcYs5gmdbZYdBmr9mQllY/KTvCwrS1a9BxFJBjQqrxjhty4qSfnDrNEqhIGHIG9dmAyFlAzhnScd4PXFtnuNNPurpZb6IXDOm56Ce9NrVL4OfY3kAN2KTlMlCn7ZpcAeVcteQaINcpsYVCrSVZc1T3/yTBG4z0dc7d27yRm5TYjkK9N9O/cIsSK1G5DQhXSH+MDckdhymRq/fuPboN6tiUZAqC7Rmg03jfYcJ+MMgK8pJsU2SmAe5K25+hYUDsfodbLJ5kk5oZyJ4RQEYTTMBdZitHHgKiHrFa1Zhx9xidsvgTNsVqIKXRODq/0afsmNocsLteczRagICUa5ZM+Bkymkiw42yNJlHv1GhAX9TniNiT/gIamZpCL6FRXowZvXqtI01Bozf6jTBdA9Fb3dg0fOx577T230OjD/pl8/ETRBO63vRniL58ldA3SMz7se87RuUpmf4BifszJb9mCIqRl6pyZx35jd+96s/fdOs/7Ol2514yQbAAAAAldEVYdGRhdGU6Y3JlYXRlADIwMTUtMDQtMDlUMjE6MDc6MDEtMDU6MDCcN7X5AAAAJXRFWHRkYXRlOm1vZGlmeQAyMDE1LTA0LTA5VDIxOjA3OjAxLTA1OjAw7WoNRQAAAABJRU5ErkJggg==";
var openboxIMG="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEkAAABLCAQAAACWsmJcAAAAAmJLR0QAAKqNIzIAAAAJcEhZcwAAAEgAAABIAEbJaz4AAACrSURBVGje7dqxDYNAEETRAVGHu7BEAeQEruWqoAsCZw7oAomAIlzIOgMdFLAj+f9r4El74WiPZ8jmjfGN7q1NPi0a1CiyGXVFbTbhXnfq+lTIrOVK6vVqMknl+ECGh4MECRIktyBBggTJLUiQIEFyCxIkSJDcggQJEiS3IEGCBMktSJAgQXILEiRIf046JlWrPqmruPlOmjI9VYaHa0u24NJD2mNM35zW69MfX7+insmQJd0AAAAldEVYdGRhdGU6Y3JlYXRlADIwMTUtMDQtMDlUMjE6MDc6MzgtMDU6MDCHIPfJAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDE1LTA0LTA5VDIxOjA3OjM4LTA1OjAw9n1PdQAAAABJRU5ErkJggg==";
var rangleIMG="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAABuCAMAAAADOYNsAAABgFBMVEUAAADz1at+Z2BeZ4St2fOzZygAAAARYa3l/v8AAEiLzPDps28RAAAAAAwod7z/9caELAwADGKo4fnZnVoMAAAAABE5i8r+5a1hEQAAKHy97fzHhEAAACNZqN762Z1PDAAAOYzM9f7//uGtYSgAADp3venxwoAoAAAMWajh/v//+tOXRRnlrWn/8cF9KAzVl1LCfTz50JI6AADtvXz/+c+ROhH+7bx3KAwAEWmt5frQkUs6kc+9dzoAAChhreH1zIwAOpLQ+f7//t6oWSP/9cqLORGR0PPhqGLMi0j+4ahZDAD//ue4cDGiUCDtuHUZAADdolz+7bhwGQD93aJQDACzaCz/+tWdTyD+6bNoEQAAKIDC8f31x4YsAAAAAECEx+8AADNPndUAEW+z6fsADFqd2fURaLMMT53Z+v4AACxos+T61ZhFAAAALIbH9f4shMYAAFKX1fQAADx9wuwARZjV+v4AABlFl9MofcH//dq4by+tXiPqwotOIwwADEl/weefWbSJAAAAAXRSTlMAQObYZgAAAAFiS0dEAIgFHUgAAAAJcEhZcwAAAEgAAABIAEbJaz4AAAGiSURBVEjHnZbFVgNREESDNRosQRMcgkNwCK7Bgru7uzu/znt7quacnu09b3Onu6pdUdExsS70xYnEJxCYmIRgcoq4UxFMSxfJyETU45WsbARzckXy8hH1ifgLECwsEikuAbC0TKS8Aj0NVIpUVQNYU8tE1DER9Q1MRKOoRQSZiKZmtYgWJqK1TS2ivUOkswvRkBHRrRPRI9Lbh2C/ETEwCODQsJMIuBojo0bEGHoa9qpFjDMRE5NExNS0XkSEiZiZVYuYYyLmF9QiFpeYiGW1iJVVJsIknlaEh4lYW1eLsIm3sQmgXXQsYmvbQcTOLoB2b/aQJRo9Zlf9+4DZLT84BDBEgtIu1NExgCaT5AQwmmZ2/U/PsNjzC/Dw8krk+gbAoIMAOAamKdy3gNmOoQLQ0Npeg3854CAATpadSSjApxVgNwgJsNfG3b1GgBnzh0fw0CbF0/P/jGYMXUqzzi+vgNEgsALeALPhAwWw2HqPaAWwtqHxzPKMVgIrE5q+rMDoDUC7gt0dtKiZAHochJ0EsCyDN90Hq7xPEuaur++fX8T+ALdhV5S36vcyAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE1LTA0LTA5VDIxOjA4OjA2LTA1OjAwqJvQ+gAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxNS0wNC0wOVQyMTowODowNi0wNTowMNnGaEYAAAAASUVORK5CYII=";
var rbraceIMG="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAABuCAMAAAB1AzHnAAACWFBMVEUAAADux5ZoXl5gb4CWpLXD1OPQkUgAAAAAI0ZnhJ20zOH76s+vknFLIwwMM1l8mLTM4fH+9+bRuZx2SygAAChLdp292e3mzKyFVy9OfqrQ6vjZt4tXJQwAJWGSxuX76smdaDwMAAAADEh3rdf/++O8fkkAAEB3uOIAEV6d2PP+88ySTiARWaTc+v7tvXwoAAAAADx9wuz/9caELAwZdr3CfTkAPJfV/P/eolsAI4vM+//mrWf4x4UjAAD7zIsAIIXH+P4AAGet5vv81Zc8AAAAAFui3vj/7bhvEQAAADF2vev//dedRhkAAAwshMbdolwAKHy97vz+7bx3KAwAACBOl9HhrW8lAAAADFWS0O///ufBf0kAJWWd1PDVqHVADABeksDi9/3z3bmQYDoMQHGcvdniw6B8VTUAABk1YImnwdnmzLSYfFkzDAAjS3GSrcbd7/r369nHs52EZ0YAJXr+9+rZxq2SdlcADG2z6vz35tG5nXxVMxkAI05wkq3G3e735syti2I1DAAMNWKLrczm9/3779e3kGQAI1J+qcvmxplnNRkAAB1AcKLM6vjUnWUADEVwqNN+vOPqvX41AAAAADNord4AABE1fsAAEWmt5foAAGGo4vrqs23iqGEARp3Z/f//+c+ROhEdfcL1x4YsAAD/+tWdTyAMRZLQ9f7QklVgndH+99+5hVPq0Kp+TigAI1OEtNrv2b2ddk9Ab53D4vThzLSYdk+tzOT+893Cp4toQSUADDVVfJm0zOTVl08AACVAXnjZ6/fms3ElAAwjQFlvfpWovMwiPeswAAAAAXRSTlMAQObYZgAAAAFiS0dEAIgFHUgAAAAJcEhZcwAAAEgAAABIAEbJaz4AAAHoSURBVEjH7dfpN1VRFADwk+Jl1kAZ8whNCikqU2YpVEqSeXrGZyoyVhKZUlGKEEXIGBkj87/F3tdHZ19r8cGy7vl6fmvvM+57LjugcvCQKiObmmyjHVbXIIimljYgmY6uHh8dOXoM0XF9AyLUiZMCMjQikLEJIlMzwpwyl4OxsCTMaSs01jbi5sxZwpw7j+O5YEuYi5eA2NkTxOEyhnEkCLuC5KoTQZyRXLtOkBu7QlxcRYmbRCQiEZm7hyi56bkz4uUNxMeXIH7+QAJuESTwNpA7QQRhwVgRQ+4S5N59IKEPqDAPw8A8CifI4whM9SSSMJsFmvwYsKhonHlMLGHi4jFQQiIVKCkZkCIllUJp6RmwiJnKLAJl5+TCpuYRy/j0WT4EKnjOA4VFxTDkktIyDnjx8hWA8tcVHPCmEkHVWx5g1TUAauvqucN8hxvZ8J6JCIsPfPGxEUTTJ74QjtTnZmJJhYP55StfbON4C5ekibokwlVraSXItu/0XqpSEpHIviTf5Lvx3m0TJ8LzvL2DL753Iukigvz4KVaBunswyK9ePukTfm2I/w2hKAf0c8HvAVcRMTiE4xge4YHRP5ikdmycA/5OYA5FyuTW/VPTM5hi9t8cL8c89P9fUC7yp7q0vLK6RvQztg6txpyZLxhmjgAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAxNS0wNC0wOVQyMToxMjo1NS0wNTowMAc/iwoAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMTUtMDQtMDlUMjE6MTI6NTUtMDU6MDB2YjO2AAAAAElFTkSuQmCC";
var rbracketIMG="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAABuBAMAAADYAF7eAAAAHlBMVEUAAAC4j4uLi4uPuN6LIwAAAAAji8z/+8yLiW9LEQAmjtI2AAAAAXRSTlMAQObYZgAAAAFiS0dEAIgFHUgAAAAJcEhZcwAAAEgAAABIAEbJaz4AAAApSURBVDjLYxBSggBlBtdQCAjDyoIAdtdR1ihrlDWyWJAyQmNqGP4yAgBeR1UTjwd/wAAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAxNS0wNC0wOVQyMTowOToxOC0wNTowMNvMwAcAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMTUtMDQtMDlUMjE6MDk6MTgtMDU6MDCqkXi7AAAAAElFTkSuQmCC";
var rparenIMG="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAABuCAMAAADlEEgoAAAB71BMVEUAAACzeWRgcI+y1OydSB0AAAAADEp9s9r75rp+QR0AADJgndHz1KBgJQzuxopBDABgotXdqGkjAAB+vOP//+O9eECFxuv/88mLRR0AJWed2fb31JlPDAAMQYrG7vzSlFYMAAAAAAwocLPk/f//9dGXTiBord7xx4k6AAAAJW+t4fe9dzolaK363KRZEQBps+LMi0gAKHy77fz+4qphEQAAABE5i8rHhDwADFv72Z0od7ytYSjxwoAoAACLORGi3fjTlE361ZhGAAD//dWdRhkAACxhreHZnVUMWaj70ZMAAFX/+syLLww6kc/CfToAO5XT+//xvXkcAABXAAAAABtGndeXPBEAT6Lb/f8AEW2z6fvlrGZ2veszAAAvi8v/6rRnDACRMQwAEXOzZygAAEmS0fPMi0AAACJXqN8ghMf4x4UAV6gAI4vM+/8AAGet5vuLIwCrXCNereK4by8ji8wAXq3eolv0wn8ARp3qs23//duiTx1vuOgAAEX/8b12GQAAIIXH+P77zIu9djOLzPAADGj/7bpvEQBZDABZqN4ofcGiUCARYa3ZnVp0KAxPndUMTpnU9/4ADFaiWSVXndThrW8lYahoJQwANXy45viS0O8AADlws+HqvX732aROksxBfrqYVyWtYjEMNWSRvd/3eUV+AAAAAXRSTlMAQObYZgAAAAFiS0dEAIgFHUgAAAAJcEhZcwAAAEgAAABIAEbJaz4AAAJPSURBVEjHtZb5X4xhFMUHnZGhaAxly7wJWbINRrbKUogkY0mIpLHvUmOnsm/Zsq9/qOc+749zzscvvL9+P/e+5557n/s8kREjR0X4V4DoaE4KxyA2lqNxRRIVj0dsAkclcUQnUpKYBEQnU1RaBkyZStG06cCMcopmJhFUzGKkcjYQm0OD5lYB8+ZTtAAIFtJ81YtcvsU0aAmApcsYSS0HVqykQWkXtIrWW+PKDVZT+9bIoLXrVFDpeguqZagOSl79BlXTxk2ObG5gQY2OYAtzb6tzHNuY8KbtpmEHS9ds6Xa2ELKrVaVL7XYks4fp3mvp9u1XP2o7QEi7kdhBVtEhR4LDhHQcUT9qOmqkk7iaOGak6zhJ120ke0KJw0lCTsWNnCYSaqyvOHNWyT53nsi+oMSFnjJ/Ehe97EtE3GUv+wohaVmQNwFXyWj1SBLaw+YnJMyEf0uutSoSNuj/K/gb6SUj0icdTUvSLTvXrLqtJyR33U/VjXwSTuJNMom3bqvp9RsBd+7mk3vylPQlVTmN8jTe99L684FfmPTUh6J7W/KJ35d0u3hpdCP57gwQB0I/2W8GH6ht6UeX7qM6f6rIRPk6A7bJqx+qZO1JMYQ5m47sIxKSsmSdbFn3uGTBYwJyT9S1WW8+P2U3ls1tF+mmv9J5yLOkCBl8ru5mC2kjLYt0uJDsCxZij42XrwiwZ8MQMzn32l3Yb1iut3EE79iNmHoPDH8QuYY+slzuJfbpMwNfqsQb8msRMt8YKCxD5jtzuPKHAJGf8p1a8Os3B38ASkSAe22uxfoAAAAldEVYdGRhdGU6Y3JlYXRlADIwMTUtMDQtMDlUMjE6MDk6NDMtMDU6MDCRK5qZAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDE1LTA0LTA5VDIxOjA5OjQzLTA1OjAw4HYiJQAAAABJRU5ErkJggg==";
var sumIMG="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJIAAACZCAQAAAButavGAAAAAmJLR0QAAKqNIzIAAAAJcEhZcwAAAEgAAABIAEbJaz4AAAT/SURBVHja7ZyxbttIEIZ/CanSXu06T6BUfgcDvu6KwxVqU/oR3FxKNkGQxg/AQ9zFPYsAKdSkiBs3rIIckRSB27nCR0dacrn/UkoozsynxhItWjsm95/5Z7VYC/whkFIQZYGBg5Y4w/UidsyD9EiF00iYllN/tOPhOnpkcSbXGSfSTY2T3mvpyd9ggrTCazydeAj3uHv8+RO+AfiKNwf9C28jry+AUn4nTlDgxYL4tQlo5F8AHwG83z9s8TFeUCJZzWSKr2UjpVzK2YETAayIE6ykmUmYfrCRK8nJBFcyeDLmFOvZBamlkksyTIP3yxV1iqvZhokNVeJC4C7L21mHCWiklNX4EdbCzUxTD/MQVAPTeiGJtzLX0oWKMAFV9KJICFSxv1DOinLc+LjsolYTplq6WWJySqmpIJ2pCRLQdz0lE+cbKkyXqsJUBxM5cRFwZcqNqjCFKRCR6nDJgJ6Z6YEi7065pa6l+ZYpTJiISrWkwlQoDhNVgnFlykZdmNr6jqotGrJMmZ+BkqK9PCgHTbuBEqOtYslskDNQ9JQpLW2uSHoeNgyULg+5IlnMWzJQtmn4RABgyxQtBsoPirwkh/OHtZUpzeM9QvbSuD5vrAM6V0p5D+AP9tctGigj4MoUXQbKCHT1eX8aNg2UTKwaKJlY6PMeAKsGShZ2DZQsbPV5R2OtzzsSqwZKFlyZos9AycRin3cENg2UbJhkQNMKlFFwZYobKFSY9PV5M3EDhYAtU4zPTFb7vJm4gULhBgqB1T5vJm6gUHBlinkDhVso7waKlylp3EChsLlQPhs3UAi8z0vBlSnmDRSuTHEDhSpTjPd53UCh4Pq8bqB4mZLGDRQKqwvlM3EDhcLaTgOj8D4vhS+Up3ADhWLOycAv24zz9dQjnQdpA8V8IgCkyhTzxe4DQwaKh+iRKjplG08md+k3UDxEAd0y5dht3An2434ePC+jm4WbJUwEzPdMulSuaSlCP8B85d8lNHNd9nsIVc14A6CP9cxkfwLCFNJ8t62Ly34Sl/0koewfq/s4IS77BKHsG//iRB8u+0kK17QUYUPSfOuxi8t+ktplP4XLPsHaZT9FGCLziyC6uOwnCWXf/FrILi77Sbqyb/wrEV0al/00XsomuXDZT+Gyn+TGNS2Fy34SL2WTdFdAeog6uOwnCWVf4xrsjZRSjr8/bMj+w3QysryyIfvVPk7GxkSI2sbqqJnWiuyX+7QwQtnXuV6tTW9GzbVWZL/V7hF3SfjNbK3r1VphGrE62Ibsb6+oyrZ8rJSy28KUmSGFsq91mfp2iDKXeFiR/d1xZoqSDdnfDVFmhmRD9qvgbsmSpVD2dWpa95vmGRNK+GaN69Vq6X7LPEO7Lch+/24FdIakf5l6JdFtizi0y/5AgPhJRfMy9aEAZYxVq+zXUiQ34yOnFY2lbC2lcBunUd5GON/Pe71aI5UUZHjoDEmH7DdyK6VcZgUnPt5gb4dbebbzfIV3+G0W+z/Uco8v+IxP+IaXe5yn6tnvYueFWs7xYSdE/+DkCEJUy/3O83vcAQC+4yOAr3hzyD+WGi+3V63mR79ELbdDdND/yCw5HT7MbQyt+xHzW/+/kkp5MfU/8Qg4j7y+AIBKTjNOpZcmouRPgFpOpv50R8E6muwsGznPO5da/ooeWb7ayYzsshrYNG35dupPdyT8OXBssZG7qT/fUfB8oLb4D8+7cVsxdnJ4AAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE1LTA0LTA5VDIxOjEwOjM1LTA1OjAwxaVSsAAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxNS0wNC0wOVQyMToxMDozNS0wNTowMLT46gwAAAAASUVORK5CYII=";


var rai=0;
var RA = new Array();
var RAL;
var RA1 = new Array(); // will be op, before, after, length
var RA1L;

var THETITLE="The Title";
var THEAUTHOR="The Author";
var THEDATE="The Date";
var MONTHS=["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var NOW = new Date();
var TODAY=MONTHS[NOW.getMonth()]+' '+NOW.getDate()+', '+NOW.getFullYear();

function fixRoots(){
	var ID, CD;
	var theRoots = document.getElementsByClassName('rootImgDiv');
	for (j=1; j<10;j++){
	for (i in theRoots){
		ID = theRoots[i];
		if ((ID != undefined) && (ID.dataset != undefined)){
			CD=document.getElementById('rootContentDiv'+ID.dataset.n);
			if (CD != null){
				ID.style.height=CD.clientHeight+'px';
				ID.style.width='12px';
			}
		}
	}
		
	var theBraces = document.getElementsByClassName('parenImageDiv');
	for (i in theBraces){
		ID = theBraces[i];
		if ((ID != undefined) && (ID.dataset != undefined)){
			CD=document.getElementById('parenContentDiv'+ID.dataset.n);
			if (CD != null){
				ID.style.height=CD.clientHeight+'px';
				ID.style.width='6px';
			}
		}
	}
	}

//	if (rootContentDiv2){
//		w=rootImageDiv2.clientWidth;
//		rootImageDiv2.style.height = rootContentDiv2.clientHeight +'px';
//		rootImageDiv2.style.width = '12px';
//	}
}


//Fix abbreviated environment names
RA[rai++]=[/\u005Cbegin{thm}/g,"\u005Cbegin{theorem}"];
RA[rai++]=[/\u005Cend{thm}/g,"\u005Cend{theorem}"];
RA[rai++]=[/\u005Cbegin{df}/g,"\u005Cbegin{definition}"];
RA[rai++]=[/\u005Cend{df}/g,"\u005Cend{definition}"];
RA[rai++]=[/\u005Cbegin{lm}/g,"\u005Cbegin{lemma}"];
RA[rai++]=[/\u005Cend{lm}/g,"\u005Cend{lemma}"];
RA[rai++]=[/\u005Cbegin{cor}/g,"\u005Cbegin{corollary}"];
RA[rai++]=[/\u005Cend{cor}/g,"\u005Cend{corollary}"];
RA[rai++]=[/\u005Cbegin{rmk}/g,"\u005Cbegin{remark}"];
RA[rai++]=[/\u005Cend{rmk}/g,"\u005Cend{remark}"];
RA[rai++]=[/\u005Cbegin{ex}/g,"\u005Cbegin{example}"];
RA[rai++]=[/\u005Cend{ex}/g,"\u005Cend{example}"];
RA[rai++]=[/\u005Cbegin{ax}/g,"\u005Cbegin{axiom}"];
RA[rai++]=[/\u005Cend{ax}/g,"\u005Cend{axiom}"];
RA[rai++]=[/\u005Cbegin{nt}/g,"\u005Cbegin{notation}"];
RA[rai++]=[/\u005Cend{nt}/g,"\u005Cend{notation}"];
RA[rai++]=[/\u005Cbegin{prop}/g,"\u005Cbegin{proposition}"];
RA[rai++]=[/\u005Cend{prop}/g,"\u005Cend{proposition}"];

RA[rai++]=[/\u005Cbegin{align}/g,"\u005Cbegin{array}"];
RA[rai++]=[/\u005Cend{align}/g,"\u005Cend{array}}"];
RA[rai++]=[/\u005Cbegin{align\*}/g,"\u005Cbegin{array}"];
RA[rai++]=[/\u005Cend{align\*}/g,"\u005Cend{array}"];
RA[rai++]=[/\u005Cbegin{cases}/g,"\\left{\u005Cbegin{array}"];
RA[rai++]=[/\u005Cend{cases}/g,"\u005Cend{array}\\hidden\\right}"];

RA[rai++]=[/\\begin{tabular}\s*{[^}]*}/g, '\\begin{tabular}'];
RA[rai++]=[/\\begin{array}\s*{[^}]*}/g, '\\begin{array}'];

RA[rai++]=[/\u005Cbegin{array}/g,"\\array{"];
RA[rai++]=[/\u005Cend{array}/g,"}"];

RA[rai++]=[/\\begin{tabular}/g, '\\tabular{'];
RA[rai++]=[/\\end{tabular}/g, '}'];


RA[rai++]=[/\\begin{theorem}\s*\\label{([^}]*)}/g, '\\NBLOCK{Theorem}{$1}'];
RA[rai++]=[/\\begin{theorem}/g, '\\NBLOCK{Theorem}{}'];
RA[rai++]=[/\\begin{definition}\s*\\label{([^}]*)}/g, '\\NBLOCK{Definition}{$1}'];
RA[rai++]=[/\\begin{definition}/g, '\\NBLOCK{Definition}{}'];
RA[rai++]=[/\\begin{lemma}\s*\\label{([^}]*)}/g, '\\NBLOCK{Lemma}{$1}'];
RA[rai++]=[/\\begin{lemma}/g, '\\NBLOCK{Lemma}{}'];
RA[rai++]=[/\\begin{proposition}\s*\\label{([^}]*)}/g, '\\NBLOCK{Proposition}{$1}'];
RA[rai++]=[/\\begin{proposition}/g, '\\NBLOCK{Proposition}{}'];
RA[rai++]=[/\\begin{corollary}\s*\\label{([^}]*)}/g, '\\NBLOCK{Corollary}{$1}'];
RA[rai++]=[/\\begin{corollary}/g, '\\NBLOCK{Corollary}{}'];
RA[rai++]=[/\\begin{example}\s*\\label{([^}]*)}/g, '\\NBLOCK{Example}{$1}'];
RA[rai++]=[/\\begin{example}/g, '\\NBLOCK{Example}{}'];
RA[rai++]=[/\\begin{remark}\s*\\label{([^}]*)}/g, '\\NBLOCK{Remark}{$1}'];
RA[rai++]=[/\\begin{remark}/g, '\\NBLOCK{Remark}{}'];
RA[rai++]=[/\\begin{note}\s*\\label{([^}]*)}/g, '\\NBLOCK{Note}{$1}'];
RA[rai++]=[/\\begin{note}/g, '\\NBLOCK{Note}{}'];
RA[rai++]=[/\\begin{axiom}\s*\\label{([^}]*)}/g, '\\NBLOCK{Axiom}{$1}'];
RA[rai++]=[/\\begin{axiom}/g, '\\NBLOCK{Axiom}{}'];
RA[rai++]=[/\\begin{notation}\s*\\label{([^}]*)}/g, '\\NBLOCK{Notation}{$1}'];
RA[rai++]=[/\\begin{notation}/g, '\\NBLOCK{Notation}{}'];
//RA[rai++]=[/\\begin{figure}\s*\\label{([^}]*)}/g, '\\NBLOCK{Figure}{$1}'];
//RA[rai++]=[/\\begin{figure}/g, '\\NBLOCK{Figure}{}'];
RA[rai++]=[/\\begin{caption}\s*\\label{([^}]*)}/g, '\\NBLOCK{Figure}{$1}'];
RA[rai++]=[/\\begin{caption}/g, '\\NBLOCK{Figure}{}'];


var URGENT = rai;


RA[rai++]=[/\u005C\[/g,"<div class='displayMath'>"];
RA[rai++]=[/\u005C\]/g,"</div>"];
RA[rai++]=[/\u005C\(/g,"<div class='inlineMath'>"];
RA[rai++]=[/\u005C\)/g,"</div>"];

RA[rai++]=[/\u005Cbegin{enumerate}/g, "<ol>"];
RA[rai++]=[/\u005Cend{enumerate}/g, "</ol>"];
RA[rai++]=[/\u005Cbegin{itemize}/g, "<ul>"];
RA[rai++]=[/\u005Cend{itemize}/g, "</ul>"];
RA[rai++]=[/\u005Citem/g, "<li>"];
RA[rai++]=[/\u005Cbegin{center}/g, "<div class='centered'>"];
RA[rai++]=[/\u005Cend{center}/g, "</div>"];
RA[rai++]=[/\u005Cbegin{quotation}/g, "<blockquote>"];
RA[rai++]=[/\u005Cend{quotation}/g, "</blockquote>"];

RA[rai++]=[/\u005Cend{theorem}/g, "</div>"];
RA[rai++]=[/\u005Cend{definition}/g, "</div>"];
RA[rai++]=[/\u005Cend{lemma}/g, "</div>"];
RA[rai++]=[/\u005Cend{corollary}/g, "</div>"];
RA[rai++]=[/\u005Cend{example}/g, "</div>"];
RA[rai++]=[/\u005Cend{remark}/g, "</div>"];
RA[rai++]=[/\u005Cend{notation}/g, "</div>"];
RA[rai++]=[/\u005Cend{axiom}/g, "</div>"];

RA[rai++]=[/\u005Cbegin{proof}/g, "<div class='proof'><i>Proof:</i>"];
RA[rai++]=[/\u005Cend{proof}/g, "<div class='qedDiv'>\u005CQED</div></div>"];
//RA[rai++]=[/\u005Cbegin{figure}/g, "<div class='figure'>"];
//RA[rai++]=[/\u005Cend{figure}/g, "</div>"];
RA[rai++]=[/\u005Cbegin{document}/g, ""];
RA[rai++]=[/\u005Cend{document}/g, ""];

RA[rai++]=[/\u005Cvfill/g,""];
RA[rai++]=[/\u005Ceject/g,""];
RA[rai++]=[/\u005C{/g,"{"];
RA[rai++]=[/\u005C}/g,"}"];
RA[rai++]=[/\u005C,/g,""];
RA[rai++]=[/\u005Cmathbb/g,"\\bf"];
RA[rai++]=[/\u005Cnoindent/g,""];
RA[rai++]=[/\u005Cindent/g,""];
RA[rai++]=[/\u005Ccdots/g,"\\ldots"];
RA[rai++]=[/\u005Chline/g,"<hr class='hline'>"];

RA[rai++]=[/\u005Csin/g,"<span class='mathPlain'>sin</span>"];
RA[rai++]=[/\u005Ccos/g,"<span class='mathPlain'>cos</span>"];
RA[rai++]=[/\u005Ctan/g,"<span class='mathPlain'>tan</span>"];
RA[rai++]=[/\u005Csec/g,"<span class='mathPlain'>sec</span>"];
RA[rai++]=[/\u005Ccsc/g,"<span class='mathPlain'>csc</span>"];
RA[rai++]=[/\u005Ccot/g,"<span class='mathPlain'>cot</span>"];
RA[rai++]=[/\u005Cln/g,"<span class='mathPlain'>ln</span>"];
RA[rai++]=[/\u005Clog/g,"<span class='mathPlain'>log</span>"];
RA[rai++]=[/\u005Cmax/g,"<span class='mathPlain'>max</span>"];
RA[rai++]=[/\u005Cmin/g,"<span class='mathPlain'>min</span>"];
RA[rai++]=[/\u005Csup/g,"<span class='mathPlain'>sup</span>"];
RA[rai++]=[/\u005Cinf/g,"<span class='mathPlain'>inf</span>"];
RA[rai++]=[/\u005Club/g,"<span class='mathPlain'>lub</span>"];
RA[rai++]=[/\u005Cglb/g,"<span class='mathPlain'>glb</span>"];
RA[rai++]=[/\u005Cgcd/g,"<span class='mathPlain'>gcd</span>"];
RA[rai++]=[/\u005Cmod/g,"<span class='mathPlain'>&nbsp;mod</span>"];

//HEREHERE

//RA[rai++]=[/\u005Cnot\s*\u005Csubseteq/g, '<span style="position: relative;display: inline;height: 12px;width: 12px;"><div style="position: absolute;top: 0;left: 6px;bottom: 0;right: 0;z-index: 2;overflow: hidden;">|</div>&#8838;</span>' ];
RA[rai++]=[/\u005Cnot\s*\u005Csubseteq/g, '&#8840;' ];
RA[rai++]=[/\u005Cnot\s*\u005Csubset/g, '&#8836;' ];
RA[rai++]=[/\u005Cnot\s*\u005Cin/g, '&#8713;' ];
RA[rai++]=[/\u005Cnot\s*=/g, '&#8800;' ];
RA[rai++]=[/\u005Cnot\s*\u005Cleq/g, '&#8816;' ];
RA[rai++]=[/\u005Cnot\s*\u005Cgeq/g, '&#8817;' ];
RA[rai++]=[/\u005Cnot\s*\u005Clt/g, '&#8814;' ];
RA[rai++]=[/\u005Cnot\s*\u005Cgt/g, '&#8815;' ];
RA[rai++]=[/\u005Cnot\s*</g, '&#8814;' ];
RA[rai++]=[/\u005Cnot\s*>/g, '&#8815;' ];

RA[rai++]=[/\u005Cnot\s*\\equiv/g, '&#8802;' ];
RA[rai++]=[/\u005Cnot\s*\\cong/g, '&#8774;' ];

RA[rai++]=[/\u005Cmodels/g, '&#8871;' ];
RA[rai++]=[/\u005Cyeilds/g, '&#8870;' ];

RA[rai++]=[/\u005Cdivides/g, '&#8739;' ];
RA[rai++]=[/\u005Cnot\s*\\divides/g, '&#8740;;' ];

RA[rai++]=[/\u005Cparallel/g, '&#8741;' ];
RA[rai++]=[/\u005Cnot\s*\\parallel/g, '&#8742;;' ];

RA[rai++]=[/\u005Codot/g, '&#8857;' ];
RA[rai++]=[/\u005Coslash/g, '&#8856;' ];
RA[rai++]=[/\u005Cbowtie/g, '&#8904;' ];

RA[rai++]=[/\u005Cvdots/g, '&#8942;' ];
RA[rai++]=[/\u005Ccdots/g, '&#8943;' ];
RA[rai++]=[/\u005Cudots/g, '&#8944;' ];
RA[rai++]=[/\u005Cddots/g, '&#8945;' ];


RA[rai++]=[/\u005Czwnj/g,"&#8204;"];
RA[rai++]=[/\u005Czwj/g,"&#8205;"];
RA[rai++]=[/\u005Czeta/g,"&#950;"];
RA[rai++]=[/\u005CZeta/g,"&#918;"];
RA[rai++]=[/\u005CYuml/g,"&#376;"];
RA[rai++]=[/\u005Cyuml/g,"&#255;"];
RA[rai++]=[/\u005Cyen/g,"&#165;"];
RA[rai++]=[/\u005Cyacute/g,"&#253;"];
RA[rai++]=[/\u005CYacute/g,"&#221;"];
RA[rai++]=[/\u005Cxi/g,"&#958;"];
RA[rai++]=[/\u005CXi/g,"&#926;"];
RA[rai++]=[/\u005Cweierp/g,"&#8472;"];
RA[rai++]=[/\u005Cwedge/g,"&#8743;"];
RA[rai++]=[/\u005Cvee/g,"&#8744;"];
RA[rai++]=[/\u005Cuuml/g,"&#252;"];
RA[rai++]=[/\u005CUuml/g,"&#220;"];
RA[rai++]=[/\u005Cupsilon/g,"&#965;"];
RA[rai++]=[/\u005CUpsilon/g,"&#933;"];
RA[rai++]=[/\u005Cupsih/g,"&#978;"];
RA[rai++]=[/\u005CUparrow/g,"&#8657;"];
RA[rai++]=[/\u005Cuparrow/g,"&#8593;"];
RA[rai++]=[/\u005Cuml/g,"&#168;"];
RA[rai++]=[/\u005Cugrave/g,"&#249;"];
RA[rai++]=[/\u005CUgrave/g,"&#217;"];
RA[rai++]=[/\u005Cucirc/g,"&#251;"];
RA[rai++]=[/\u005CUcirc/g,"&#219;"];
RA[rai++]=[/\u005CuArr/g,"&#8657;"];
RA[rai++]=[/\u005Cuarr/g,"&#8593;"];
RA[rai++]=[/\u005Cuacute/g,"&#250;"];
RA[rai++]=[/\u005CUacute/g,"&#218;"];
RA[rai++]=[/\u005Ctrade/g,"&#8482;"];
RA[rai++]=[/\u005Ctimes/g,"&#215;"];
RA[rai++]=[/\u005Ctilde/g,"&#732;"];
RA[rai++]=[/\u005Cthorn/g,"&#254;"];
RA[rai++]=[/\u005CTHORN/g,"&#222;"];
RA[rai++]=[/\u005Cthinsp/g,"&#8201;"];
RA[rai++]=[/\u005Cthetasym/g,"&#977;"];
RA[rai++]=[/\u005Ctheta/g,"&#952;"];
RA[rai++]=[/\u005CTheta/g,"&#920;"];
RA[rai++]=[/\u005Ctherefore/g,"&#8756;"];
RA[rai++]=[/\u005Cthere4/g,"&#8756;"];
RA[rai++]=[/\u005Ctau/g,"&#964;"];
RA[rai++]=[/\u005CTau/g,"&#932;"];
RA[rai++]=[/\u005Cszlig/g,"&#223;"];
RA[rai++]=[/\u005Csupseteq/g,"&#8839;"];
RA[rai++]=[/\u005Csupset/g,"&#8835;"];
RA[rai++]=[/\u005Csupe/g,"&#8839;"];
RA[rai++]=[/\u005Csup3/g,"&#179;"];
RA[rai++]=[/\u005Csup2/g,"&#178;"];
RA[rai++]=[/\u005Csup1/g,"&#185;"];
RA[rai++]=[/\u005Csup/g,"&#8835;"];
RA[rai++]=[/\u005Csubseteq/g,"&#8838;"];
RA[rai++]=[/\u005Csubset/g,"&#8834;"];
RA[rai++]=[/\u005Csube/g,"&#8838;"];
RA[rai++]=[/\u005Csub/g,"&#8834;"];
RA[rai++]=[/\u005Cspades/g,"&#9824;"];
RA[rai++]=[/\u005Csim/g,"&#8764;"];
RA[rai++]=[/\u005Csigmaf/g,"&#962;"];
RA[rai++]=[/\u005Csigma/g,"&#963;"];
RA[rai++]=[/\u005CSigma/g,"&#931;"];
RA[rai++]=[/\u005Cshy/g,"&#173;"];
RA[rai++]=[/\u005Csect/g,"&#167;"];
RA[rai++]=[/\u005Csdot/g,"&#8901;"];
RA[rai++]=[/\u005Cscaron/g,"&#353;"];
RA[rai++]=[/\u005CScaron/g,"&#352;"];
RA[rai++]=[/\u005Csbquo/g,"&#8218;"];
RA[rai++]=[/\u005Crsquo/g,"&#8217;"];
RA[rai++]=[/\u005Crsaquo/g,"&#8250;"];
RA[rai++]=[/\u005Crlm/g,"&#8207;"];
RA[rai++]=[/\u005CRightarrow/g,"&#8658;"];
RA[rai++]=[/\u005Crightarrow/g,"&#8594;"];
RA[rai++]=[/\u005Crho/g,"&#961;"];
RA[rai++]=[/\u005CRho/g,"&#929;"];
RA[rai++]=[/\u005Crfloor/g,"&#8971;"];
RA[rai++]=[/\u005Creg/g,"&#174;"];
RA[rai++]=[/\u005Creal/g,"&#8476;"];
RA[rai++]=[/\u005Crdquo/g,"&#8221;"];
RA[rai++]=[/\u005Crceil/g,"&#8969;"];
RA[rai++]=[/\u005CrArr/g,"&#8658;"];
RA[rai++]=[/\u005Crarr/g,"&#8594;"];
RA[rai++]=[/\u005Craquo/g,"&#187;"];
RA[rai++]=[/\u005Crangle/g,"&#9002;"];
RA[rai++]=[/\u005Crang/g,"&#9002;"];
RA[rai++]=[/\u005Cradic/g,"&#8730;"];
RA[rai++]=[/\u005Cquot/g,"&#34;"];
RA[rai++]=[/\u005Cpsi/g,"&#968;"];
RA[rai++]=[/\u005CPsi/g,"&#936;"];
RA[rai++]=[/\u005Cprop/g,"&#8733;"];
RA[rai++]=[/\u005Cprod/g,"&#8719;"];
RA[rai++]=[/\u005CPrime/g,"&#8243;"];
RA[rai++]=[/\u005Cprime/g,"&#8242;"];
RA[rai++]=[/\u005Cpound/g,"&#163;"];
RA[rai++]=[/\u005Cpm/g,"&#177;"];
RA[rai++]=[/\u005Cplusmn/g,"&#177;"];
RA[rai++]=[/\u005Cpiv/g,"&#982;"];
RA[rai++]=[/\u005Cpi/g,"&#960;"];
RA[rai++]=[/\u005CPi/g,"&#928;"];
RA[rai++]=[/\u005Cphi/g,"&#966;"];
RA[rai++]=[/\u005CPhi/g,"&#934;"];
RA[rai++]=[/\u005Cperp/g,"&#8869;"];
RA[rai++]=[/\u005Cpermil/g,"&#8240;"];
RA[rai++]=[/\u005Cpartial/g,"&#8706;"];
RA[rai++]=[/\u005Cpart/g,"&#8706;"];
RA[rai++]=[/\u005Cpara/g,"&#182;"];
RA[rai++]=[/\u005Couml/g,"&#246;"];
RA[rai++]=[/\u005COuml/g,"&#214;"];
RA[rai++]=[/\u005Cotimes/g,"&#8855;"];
RA[rai++]=[/\u005Cotilde/g,"&#245;"];
RA[rai++]=[/\u005COtilde/g,"&#213;"];
RA[rai++]=[/\u005Coslash/g,"&#248;"];
RA[rai++]=[/\u005COslash/g,"&#216;"];
RA[rai++]=[/\u005Cordm/g,"&#186;"];
RA[rai++]=[/\u005Cordf/g,"&#170;"];
RA[rai++]=[/\u005Cor/g,"&#8744;"];
RA[rai++]=[/\u005Coplus/g,"&#8853;"];
RA[rai++]=[/\u005Comicron/g,"&#959;"];
RA[rai++]=[/\u005COmicron/g,"&#927;"];
RA[rai++]=[/\u005Comega/g,"&#969;"];
RA[rai++]=[/\u005COmega/g,"&#937;"];
RA[rai++]=[/\u005Coline/g,"&#8254;"];
RA[rai++]=[/\u005Cograve/g,"&#242;"];
RA[rai++]=[/\u005COgrave/g,"&#210;"];
RA[rai++]=[/\u005Coelig/g,"&#339;"];
RA[rai++]=[/\u005COElig/g,"&#338;"];
RA[rai++]=[/\u005Cocirc/g,"&#244;"];
RA[rai++]=[/\u005COcirc/g,"&#212;"];
RA[rai++]=[/\u005Coacute/g,"&#243;"];
RA[rai++]=[/\u005COacute/g,"&#211;"];
RA[rai++]=[/\u005Cnu/g,"&#957;"];
RA[rai++]=[/\u005CNu/g,"&#925;"];
RA[rai++]=[/\u005Cntilde/g,"&#241;"];
RA[rai++]=[/\u005CNtilde/g,"&#209;"];
RA[rai++]=[/\u005Cnsub/g,"&#8836;"];
RA[rai++]=[/\u005Cnotin/g,"&#8713;"];
RA[rai++]=[/\u005Cnot/g,"&#172;"];
RA[rai++]=[/\u005Cni/g,"&#8715;"];
RA[rai++]=[/\u005Cneq/g,"&#8800;"];
RA[rai++]=[/\u005Cneg/g,"&#172;"];
RA[rai++]=[/\u005Cne/g,"&#8800;"];
RA[rai++]=[/\u005Cndash/g,"&#8211;"];
RA[rai++]=[/\u005Cnbsp/g,"&#160;"];
RA[rai++]=[/\u005Cnabla/g,"&#8711;"];
RA[rai++]=[/\u005Cmu/g,"&#956;"];
RA[rai++]=[/\u005CMu/g,"&#924;"];
RA[rai++]=[/\u005Cminus/g,"&#8722;"];
RA[rai++]=[/\u005Cmiddot/g,"&#183;"];
RA[rai++]=[/\u005Cmicro/g,"&#181;"];
RA[rai++]=[/\u005Cmdash/g,"&#8212;"];
RA[rai++]=[/\u005Cmacr/g,"&#175;"];
RA[rai++]=[/\u005Clt/g,"&#60;"];
RA[rai++]=[/\u005Clsquo/g,"&#8216;"];
RA[rai++]=[/\u005Clsaquo/g,"&#8249;"];
RA[rai++]=[/\u005Clrm/g,"&#8206;"];
RA[rai++]=[/\u005Cloz/g,"&#9674;"];
RA[rai++]=[/\u005Clowast/g,"&#8727;"];
RA[rai++]=[/\u005Clfloor/g,"&#8970;"];
RA[rai++]=[/\u005Cleq/g,"&#8804;"];
RA[rai++]=[/\u005CLeftrightarrow/g,"&#8660;"];
RA[rai++]=[/\u005Cleftrightarrow/g,"&#8596;"];
RA[rai++]=[/\u005CLeftarrow/g,"&#8656;"];
//RA[rai++]=[/\u005Cle/g,"&#8804;"];
RA[rai++]=[/\u005Cldquo/g,"&#8220;"];
RA[rai++]=[/\u005Cldots/g,"&#8230;"];
RA[rai++]=[/\u005Clceil/g,"&#8968;"];
RA[rai++]=[/\u005ClArr/g,"&#8656;"];
RA[rai++]=[/\u005Clarr/g,"&#8592;"];
RA[rai++]=[/\u005Clarr/g,"&#8592;"];
RA[rai++]=[/\u005Claquo/g,"&#171;"];
RA[rai++]=[/\u005Clangle/g,"&#9001;"];
RA[rai++]=[/\u005Clang/g,"&#9001;"];
RA[rai++]=[/\u005Clambda/g,"&#955;"];
RA[rai++]=[/\u005CLambda/g,"&#923;"];
RA[rai++]=[/\u005Ckappa/g,"&#954;"];
RA[rai++]=[/\u005CKappa/g,"&#922;"];
RA[rai++]=[/\u005Ciuml/g,"&#239;"];
RA[rai++]=[/\u005CIuml/g,"&#207;"];
RA[rai++]=[/\u005Cisin/g,"&#8712;"];
RA[rai++]=[/\u005Ciquest/g,"&#191;"];
RA[rai++]=[/\u005Ciota/g,"&#953;"];
RA[rai++]=[/\u005CIota/g,"&#921;"];
RA[rai++]=[/\u005Cinfty/g,"&#8734;"];
RA[rai++]=[/\u005Cinft/g,"&#8734;"];
RA[rai++]=[/\u005Cimage/g,"&#8465;"];
RA[rai++]=[/\u005Cigrave/g,"&#236;"];
RA[rai++]=[/\u005CIgrave/g,"&#204;"];
RA[rai++]=[/\u005Ciexcl/g,"&#161;"];
RA[rai++]=[/\u005Cicirc/g,"&#238;"];
RA[rai++]=[/\u005CIcirc/g,"&#206;"];
RA[rai++]=[/\u005Ciacute/g,"&#237;"];
RA[rai++]=[/\u005CIacute/g,"&#205;"];
RA[rai++]=[/\u005Chellip/g,"&#8230;"];
RA[rai++]=[/\u005Chearts/g,"&#9829;"];
RA[rai++]=[/\u005ChArr/g,"&#8660;"];
RA[rai++]=[/\u005Charr/g,"&#8596;"];
RA[rai++]=[/\u005Cgt/g,"&#62;"];
RA[rai++]=[/\u005Cgeq/g,"&#8805;"];
RA[rai++]=[/\u005Cge/g,"&#8805;"];
RA[rai++]=[/\u005Cgamma/g,"&#947;"];
RA[rai++]=[/\u005CGamma/g,"&#915;"];
RA[rai++]=[/\u005Cfrasl/g,"&#8260;"];
RA[rai++]=[/\u005Cfrac34/g,"&#190;"];
RA[rai++]=[/\u005Cfrac14/g,"&#188;"];
RA[rai++]=[/\u005Cfrac12/g,"&#189;"];
RA[rai++]=[/\u005Cforall/g,"&#8704;"];
RA[rai++]=[/\u005Cfnof/g,"&#402;"];
RA[rai++]=[/\u005Cexists/g,"&#8707;"];
RA[rai++]=[/\u005Cexist/g,"&#8707;"];
RA[rai++]=[/\u005Ceuro/g,"&#8364;"];
RA[rai++]=[/\u005Ceuml/g,"&#235;"];
RA[rai++]=[/\u005CEuml/g,"&#203;"];
RA[rai++]=[/\u005Ceth/g,"&#240;"];
RA[rai++]=[/\u005CETH/g,"&#208;"];
RA[rai++]=[/\u005Ceta/g,"&#951;"];
RA[rai++]=[/\u005CEta/g,"&#919;"];
RA[rai++]=[/\u005Cequiv/g,"&#8801;"];
RA[rai++]=[/\u005Cepsilon/g,"&#949;"];
RA[rai++]=[/\u005CEpsilon/g,"&#917;"];
RA[rai++]=[/\u005Censp/g,"&#8194;"];
RA[rai++]=[/\u005Cemsp/g,"&#8195;"];
RA[rai++]=[/\u005Cemptyset/g,"&#8709;"];
RA[rai++]=[/\u005Cempty/g,"&#8709;"];
RA[rai++]=[/\u005Cegrave/g,"&#232;"];
RA[rai++]=[/\u005CEgrave/g,"&#200;"];
RA[rai++]=[/\u005Cecirc/g,"&#234;"];
RA[rai++]=[/\u005CEcirc/g,"&#202;"];
RA[rai++]=[/\u005Ceacute/g,"&#233;"];
RA[rai++]=[/\u005CEacute/g,"&#201;"];
RA[rai++]=[/\u005CDownarrow/g,"&#8659;"];
RA[rai++]=[/\u005Cdownarrow/g,"&#8595;"];
RA[rai++]=[/\u005Cdivide/g,"&#247;"];
RA[rai++]=[/\u005Cdiv/g,"&#247;"];
RA[rai++]=[/\u005Cdiams/g,"&#9830;"];
RA[rai++]=[/\u005Cdelta/g,"&#948;"];
RA[rai++]=[/\u005CDelta/g,"&#916;"];
RA[rai++]=[/\u005Cdeg/g,"&#176;"];
RA[rai++]=[/\u005Cddagger/g,"&#8225;"];
RA[rai++]=[/\u005Cddagger/g,"&#8225;"];
RA[rai++]=[/\u005CdArr/g,"&#8659;"];
RA[rai++]=[/\u005Cdarr/g,"&#8595;"];
RA[rai++]=[/\u005Cdagger/g,"&#8224;"];
RA[rai++]=[/\u005Ccurren/g,"&#164;"];
RA[rai++]=[/\u005Ccup/g,"&#8746;"];
RA[rai++]=[/\u005Ccrarr/g,"&#8629;"];
RA[rai++]=[/\u005Ccopyright/g,"&#169;"];
RA[rai++]=[/\u005Ccopy/g,"&#169;"];
RA[rai++]=[/\u005Ccong/g,"&#8773;"];
RA[rai++]=[/\u005Ccong/g,"&#8773;"];
RA[rai++]=[/\u005Cclubs/g,"&#9827;"];
RA[rai++]=[/\u005Ccirc/g,"&#710;"];
RA[rai++]=[/\u005Cchi/g,"&#967;"];
RA[rai++]=[/\u005CChi/g,"&#935;"];
RA[rai++]=[/\u005Ccent/g,"&#162;"];
RA[rai++]=[/\u005Ccedil/g,"&#184;"];
RA[rai++]=[/\u005Ccdot/g,"&#8901;"];
RA[rai++]=[/\u005Cccedil/g,"&#231;"];
RA[rai++]=[/\u005CCcedil/g,"&#199;"];
RA[rai++]=[/\u005Ccap/g,"&#8745;"];
RA[rai++]=[/\u005Cbullet/g,"&#8226;"];
RA[rai++]=[/\u005Cbull/g,"&#8226;"];
RA[rai++]=[/\u005Cbrvbar/g,"&#166;"];
RA[rai++]=[/\u005CQED/g,"<div class='openboxIMGdiv'><img src='"+openboxIMG+"' class='openboxIMG'></div>"];
RA[rai++]=[/\u005Cqed/g,"<div class='openboxIMGdiv'><img src='"+openboxIMG+"' class='openboxIMG'></div>"];
RA[rai++]=[/\u005Csquare/g,"<div class='openboxIMGdiv'><img src='"+openboxIMG+"' class='openboxIMG'></div>"];
RA[rai++]=[/\u005CBox/g,"<div class='openboxIMGdiv'><img src='"+blackboxIMG+"' class='openboxIMG'></div>"];
//RA[rai++]=[/\u005Cqed/g,"&#9608;"];
//RA[rai++]=[/\u005CBox/g,"&#9608;"];
RA[rai++]=[/\u005Cbeta/g,"&#946;"];
RA[rai++]=[/\u005CBeta/g,"&#914;"];
RA[rai++]=[/\u005Cbdquo/g,"&#8222;"];
RA[rai++]=[/\u005Cauml/g,"&#228;"];
RA[rai++]=[/\u005CAuml/g,"&#196;"];
RA[rai++]=[/\u005Catilde/g,"&#227;"];
RA[rai++]=[/\u005CAtilde/g,"&#195;"];
RA[rai++]=[/\u005Casymp/g,"&#8776;"];
RA[rai++]=[/\u005Caring/g,"&#229;"];
RA[rai++]=[/\u005CAring/g,"&#197;"];
RA[rai++]=[/\u005Capprox/g,"&#8776;"];
RA[rai++]=[/\u005Cang/g,"&#8736;"];
RA[rai++]=[/\u005Cand/g,"&#8743;"];
RA[rai++]=[/\u005Camp/g,"&#38;"];
RA[rai++]=[/\u005Calpha/g,"&#945;"];
RA[rai++]=[/\u005CAlpha/g,"&#913;"];
RA[rai++]=[/\u005Caleph/g,"&#8501;"];
RA[rai++]=[/\u005Calefsym/g,"&#8501;"];
RA[rai++]=[/\u005Cagrave/g,"&#224;"];
RA[rai++]=[/\u005CAgrave/g,"&#192;"];
RA[rai++]=[/\u005Caelig/g,"&#230;"];
RA[rai++]=[/\u005CAElig/g,"&#198;"];
RA[rai++]=[/\u005Cacute/g,"&#180;"];
RA[rai++]=[/\u005Cacirc/g,"&#226;"];
RA[rai++]=[/\u005CAcirc/g,"&#194;"];
RA[rai++]=[/\u005Caacute/g,"&#225;"];
RA[rai++]=[/\u005CAacute/g,"&#193;"];
RA[rai++]=[/\u0005CDagger/g,"&#8225;"];

RA[rai++]=[/\u005CR/g,"&#8477;"];
RA[rai++]=[/\u005CC/g,"&#8450;"];
RA[rai++]=[/\u005CN/g,"&#8469;"];
RA[rai++]=[/\u005CP/g,"&#8472;"];
RA[rai++]=[/\u005CQ/g,"&#8474;"];
RA[rai++]=[/\u005CZ/g,"&#8484;"];
RA[rai++]=[/\u005Ctriangle/g,"<span class='mathPlain'>&#9651;</span>"];

RA[rai++]=[/\u005Cdiamond/g,"&#8900;"];
RA[rai++]=[/\u005Crightangle/g,"&#8735;"];



RA[rai++]=[/{\u005Cbf/g,"\u005Cbf{"];
RA[rai++]=[/{\u005Cit/g,"\u005Cit{"];

RA[rai++]=[/{\u005CLarge/g,"\u005CLarge{"];
RA[rai++]=[/{\u005Csmall/g,"\u005Csmall{"];
RA[rai++]=[/{\u005Ctiny/g,"\u005Ctiny{"];
RA[rai++]=[/{\u005Clarge/g,"\u005Clarge{"];
RA[rai++]=[/{\u005Chuge/g,"\u005Chuge{"];
RA[rai++]=[/{\u005CHuge/g,"\u005CHuge{"];

RA[rai++]=[/\n\s*\n/g,"<br>"];


RA[rai++]=[/\\today/g,TODAY];

var SPECIAL = rai;

RA[rai++]=[/\\left:OR(\d+):([^]*)\\right:CR\1:\^:OB(\d+):([^]*):CB\3:/, '<div class="paren"><div class="parenImageDiv" id="lparenImageDiv$1" data-n="$1"><img class="parenImg" src="'+lbracketIMG+'"></div><div class="parenContents" id="parenContentDiv$1">$2</div><div class="parenImageDiv" id="rparenImageDiv$1" data-n="$1"><img class="parenImg" src="'+rbracketIMG+'"></div><div class="parenImageDiv specialExponent" id="rparenImageDiv$1" data-n="$1">$4</div></div>'];
RA[rai++]=[/\\left:OB(\d+):([^]*)\\right:CB\1:\^:OB(\d+):([^]*):CB\3:/, '<div class="paren"><div class="parenImageDiv" id="lparenImageDiv$1" data-n="$1"><img class="parenImg" src="'+lbraceIMG+'"></div><div class="parenContents" id="parenContentDiv$1">$2</div><div class="parenImageDiv" id="rparenImageDiv$1" data-n="$1"><img class="parenImg" src="'+rbraceIMG+'"></div><div class="parenImageDiv specialExponent" id="rparenImageDiv$1" data-n="$1">$4</div></div>'];
RA[rai++]=[/\\left:OP(\d+):([^]*)\\right:CP\1:\^:OB(\d+):([^]*):CB\3:/, '<div class="paren"><div class="parenImageDiv" id="lparenImageDiv$1" data-n="$1"><img class="parenImg" src="'+lparenIMG+'"></div><div class="parenContents" id="parenContentDiv$1">$2</div><div class="parenImageDiv" id="rparenImageDiv$1" data-n="$1"><img class="parenImg" src="'+rparenIMG+'"></div><div class="parenImageDiv specialExponent" id="rparenImageDiv$1" data-n="$1">$4</div></div>'];

RA[rai++]=[/\\left:OR(\d+):([^]*)\\right:CR\1:\^(.)/, '<div class="paren"><div class="parenImageDiv" id="lparenImageDiv$1" data-n="$1"><img class="parenImg" src="'+lbracketIMG+'"></div><div class="parenContents" id="parenContentDiv$1">$2</div><div class="parenImageDiv" id="rparenImageDiv$1" data-n="$1"><img class="parenImg" src="'+rbracketIMG+'"></div><div class="parenImageDiv specialExponent" id="rparenImageDiv$1" data-n="$1">$3</div></div>'];
RA[rai++]=[/\\left:OB(\d+):([^]*)\\right:CB\1:\^(.)/, '<div class="paren"><div class="parenImageDiv" id="lparenImageDiv$1" data-n="$1"><img class="parenImg" src="'+lbraceIMG+'"></div><div class="parenContents" id="parenContentDiv$1">$2</div><div class="parenImageDiv" id="rparenImageDiv$1" data-n="$1"><img class="parenImg" src="'+rbraceIMG+'"></div><div class="parenImageDiv specialExponent" id="rparenImageDiv$1" data-n="$1">$3</div></div>'];
RA[rai++]=[/\\left:OP(\d+):([^]*)\\right:CP\1:\^(.)/, '<div class="paren"><div class="parenImageDiv" id="lparenImageDiv$1" data-n="$1"><img class="parenImg" src="'+lparenIMG+'"></div><div class="parenContents" id="parenContentDiv$1">$2</div><div class="parenImageDiv" id="rparenImageDiv$1" data-n="$1"><img class="parenImg" src="'+rparenIMG+'"></div><div class="parenImageDiv specialExponent" id="rparenImageDiv$1" data-n="$1">$3</div></div>'];

RA[rai++]=[/\\left:OB(\d+):([^]*)\\hidden\\right:CB\1:/, '<div class="paren"><div class="parenImageDiv" id="lparenImageDiv$1" data-n="$1"><img class="parenImg" src="'+lbraceIMG+'"></div><div class="parenContents" id="parenContentDiv$1">$2</div><div class="parenImageDiv" id="rparenImageDiv$1" data-n="$1"></div></div>'];
RA[rai++]=[/\\left:OB(\d+):([^]*)\\right:CB\1:/, '<div class="paren"><div class="parenImageDiv" id="lparenImageDiv$1" data-n="$1"><img class="parenImg" src="'+lbraceIMG+'"></div><div class="parenContents" id="parenContentDiv$1">$2</div><div class="parenImageDiv" id="rparenImageDiv$1" data-n="$1"><img class="parenImg" src="'+rbraceIMG+'"></div></div>'];
RA[rai++]=[/\\left:OP(\d+):([^]*)\\right:CP\1:/, '<div class="paren"><div class="parenImageDiv" id="lparenImageDiv$1" data-n="$1"><img class="parenImg" src="'+lparenIMG+'"></div><div class="parenContents" id="parenContentDiv$1">$2</div><div class="parenImageDiv" id="rparenImageDiv$1" data-n="$1"><img class="parenImg" src="'+rparenIMG+'"></div></div>'];
RA[rai++]=[/\\left:OR(\d+):([^]*)\\right:CR\1:/, '<div class="paren"><div class="parenImageDiv" id="lparenImageDiv$1" data-n="$1"><img class="parenImg" src="'+lbracketIMG+'"></div><div class="parenContents" id="parenContentDiv$1">$2</div><div class="parenImageDiv" id="rparenImageDiv$1" data-n="$1"><img class="parenImg" src="'+rbracketIMG+'"></div></div>'];


RA[rai++]=[ /\\title:OB(\d+):([^]*):CB\1:/, ''];
RA[rai++]=[/\\author:OB(\d+):([^]*):CB\1:/,  ''];
RA[rai++]=[/\\date:OB(\d+):([^]*):CB\1:/,  ''];

//RA[rai++]=[/\\tabular:OB(\d+):([^]*)&([^]*):CB\1:/, '\\tabular:OB$1:$2</td><td>$3:CB$1:'];
RA[rai++]=[/\\tabular:OB(\d+):([^]*):ampand:([^]*):CB\1:/, '\\tabular:OB$1:$2</td><td>$3:CB$1:'];
RA[rai++]=[/\\tabular:OB(\d+):([^]*)\\\\([^]*):CB\1:/, '\\tabular:OB$1:$2</td></tr>\n<tr><td>$3:CB$1:'];
RA[rai++]=[/\\tabular:OB(\d+):([^]*):CB\1:/, '<table><tr><td>$2</td></tr></table>'];

RA[rai++]=[/\\array:OB(\d+):([^]*):ampand:([^]*):CB\1:/, '\\array:OB$1:$2</div></td><td><div class="inlineMath">$3:CB$1:'];
RA[rai++]=[/\\array:OB(\d+):([^]*)\\\\([^]*):CB\1:/, '\\array:OB$1:$2</div></td></tr>\n<tr><td><div class="inlineMath">$3:CB$1:'];
RA[rai++]=[/\\array:OB(\d+):([^]*):CB\1:/, '<table><tr><td><div class="inlineMath">$2</div></td></tr></table>'];


RA[rai++]=[/\\sum\_:OB(\d+):([^]*):CB\1:\^:OB(\d+):([^]*):CB\3:/, "<div class='sum'><div class='uppersumlimit'>$4</div><div class='sumsymbol'>&sum;</div><div class='lowersumlimit'>$2</div></div>"];
RA[rai++]=[/\u005Csum/g,"&#8721;"];


RA[rai++]=[/\\int\_:OB(\d+):([^]*):CB\1:\^:OB(\d+):([^]*):CB\3:/, "<div class='sum'><div class='uppersumlimit'>$4</div><div class='sumsymbol'>&int;</div><div class='lowersumlimit'>$2</div></div>"];
RA[rai++]=[/\u005Cint/g,"&#8747;"];

RA[rai++]=[/\\iint\_:OB(\d+):([^]*):CB\1:\^:OB(\d+):([^]*):CB\3:/, "<div class='sum'><div class='uppersumlimit'>$4</div><div class='sumsymbol'>&#8748;</div><div class='lowersumlimit'>$2</div></div>"];
RA[rai++]=[/\u005Ciint/g,"&#8748;"];

RA[rai++]=[/\\iiint\_:OB(\d+):([^]*):CB\1:\^:OB(\d+):([^]*):CB\3:/, "<div class='sum'><div class='uppersumlimit'>$4</div><div class='sumsymbol'>&#8749;</div><div class='lowersumlimit'>$2</div></div>"];
RA[rai++]=[/\u005Ciiint/g,"&#8749;"];

RA[rai++]=[/\\lim\_:OB(\d+):([^]*):CB\1:/, '<div class="limit"><div class="limitTop">lim</div><div class="limitBottom">$2</div></div>'];
RA[rai++]=[/\u005Clim/g,"<span class='mathPlain'>lim</span>"];

RA[rai++]=[/\^:OB(\d+):([^]*):CB\1:/, '<div class="exponent">$2</div>'];
RA[rai++]=[/\^(.)/g, '<div class="exponent">$1</div>'];

RA[rai++]=[/\_:OB(\d+):([^]*):CB\1:/, '<div class="subscript">$2</div>'];
RA[rai++]=[/\_(.)/g, '<div class="subscript">$1</div>'];
RA[rai++]=[/\\frac:OB(\d+):([^]*):CB\1::OB(\d+):([^]*):CB\3:/, "<div class='fraction'><div class='numerator'>&nbsp;$2&nbsp;</div><hr class='fracLine'><div class='denominator'>&nbsp;$4&nbsp;</div></div>"];

RA[rai++]=[/\\bf:OB(\d+):([^]*):CB\1:/, "<b>$2</b>"];
RA[rai++]=[/\\it:OB(\d+):([^]*):CB\1:/, "<i>$2</i>"];
RA[rai++]=[/\\em:OB(\d+):([^]*):CB\1:/, "<i>$2</i>"];

RA[rai++]=[/\\overline:OB(\d+):([^]*):CB\1:/, "<div class='overline'>$2</div>"];
RA[rai++]=[/\\bar:OB(\d+):([^]*):CB\1:/, "<div class='overline'>$2</div>"];
RA[rai++]=[/\\underline:OB(\d+):([^]*):CB\1:/, "<div class='underline'>$2</div>"];
RA[rai++]=[/\\Large:OB(\d+):([^]*):CB\1:/, "<div class='Large'>$2</div>"];
RA[rai++]=[/\\Huge:OB(\d+):([^]*):CB\1:/, "<div class='Huge'>$2</div>"];
RA[rai++]=[/\\large:OB(\d+):([^]*):CB\1:/, "<div class='Large'>$2</div>"];
RA[rai++]=[/\\huge:OB(\d+):([^]*):CB\1:/, "<div class='Huge'>$2</div>"];
RA[rai++]=[/\\small:OB(\d+):([^]*):CB\1:/, "<div class='small'>$2</div>"];
RA[rai++]=[/\\tiny:OB(\d+):([^]*):CB\1:/, "<div class='tiny'>$2</div>"];

RA[rai++]=[/\\hbox:OB(\d+):([^]*):CB\1:/, "<div class='hbox'>$2</div>"];
RA[rai++]=[/\\seq:OB(\d+):([^]*):CB\1:/, "&#9001;$2&#9002;"];

RA[rai++]=[/\\sqrt:OB(\d+):([^]*):CB\1:/, '<div class="root"><div class="rootImgDiv" id="rootImageDiv$1" data-n="$1"><img class="rootImg" src="'+sqrtIMG+'"></div><div class="rootContents" id="rootContentDiv$1">&nbsp;$2&nbsp;</div></div>'];
//RA[rai++]=[/\\sqrt\s*(.)/g, '<div class="root"><div class="rootImgDiv"><img class="rootImg" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAABkCAYAAADaIVPoAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsIAAA7CARUoSoAAAAGQSURBVHhe7dvRqsJADARQ1///Z7UXLgiCpm0ymUynzwU5yezsS12P13O70HO/kPWParD6xr1hb1hsAo602EI/ON6wNyw2AUdabKEuLUfakRabgCMttlC3tCPtSItNwJEWW6hb2pF2pMUm4EiLLdQt7Ug70mITcKTFFuqWdqQdabEJONJiC3VLXy7S67Xz1K9p2T/OTQe/HxpGfGmk19rmyfWUgjcqG7oczIaGgJlCDQOzRBsGZon2yvxXS3SLndcVdMP/Zzk6mIqznwru3Fx0OKng7Uej6K4tp4PZ0SVgZnQZOHqm0NdVKTh6nvcM5+y7pWDGaJeD2dAQMBMaBt5z9irvaCiYocSgYIZow8Hd6BZwJ7oN3FVireCOEmsFd0S7HYxGU4CRaBowqsSowIgSowIjok0HrkZTgivRtOCqEqMGV5QYNbgi2vTgbPQIcCZ6DDirxEaBM0psFDgj2uPAZ9EjwWfQY8FHS2w0+EiJjQYfifZ48F60BHgPWgYcLTEpcKTEpMCRaMuBf6Elwd/QT31rf7W3mhl/AAAAAElFTkSuQmCC"></div><div class="rootContents">&nbsp;$1&nbsp;</div></div>'];
RA[rai++]=[/\u005Cin/g,"&#8712;"];



RA[rai++]=[/\\begin:OB(\d+):([^]*):CB\1:/, '<div class="$2">'];
RA[rai++]=[/\\end:OB(\d+):([^]*):CB\1:/, '</div>'];



var ENDSPECIAL = rai;


RAL=rai;

//-----------------------------------------------------------------------------------------
function removeComments(s){
	var i,j;
	var t=s;
	var a,b,c;
	i=t.indexOf("%");
	while (i!=-1){
		a=t.substring(0,i);
		b=t.substring(i);
		j=b.indexOf('\n');
		if (j!=-1)
			c=b.substring(j+1);
		else
			c='';
		t=a+c;
		i=t.indexOf("%");
		}
	return(t);
	}
//-----------------------------------------------------------------------------------------
function handleDoubleDollar(s){
	var t=s;
	while (t.indexOf("$$") != -1){
		t=t.replace("$$", "\\"+"[");
		t=t.replace("$$", "\\"+"]");
		}
	return(t);
	}
function handleDollar(s){
	var t=s;
	while (t.indexOf("$") != -1){
		t=t.replace("$", "\\"+"(");
		t=t.replace("$", "\\"+")");
		}
	return(t);
	}
//--------------------------------------------------------------------------------------------
var openBraceCharCode='{'.charCodeAt(0);
var closeBraceCharCode='}'.charCodeAt(0);
var slashCharCode='\\'.charCodeAt(0);
	
function matchBraces(s){
	var i=0;
	while (s.search(/\{([^{}]*)\}/)!=-1){
		s=s.replace(/\{([^{}]*)\}/, ':OB'+i+':$1:CB'+i+':');
		i++;
	}
	while (s.search(/\(([^()]*)\)/)!=-1){
		s=s.replace(/\(([^()]*)\)/, ':OP'+i+':$1:CP'+i+':');
		i++;
	}
	while (s.search(/\[([^\[\]]*)\]/)!=-1){
		s=s.replace(/\[([^\[\]]*)\]/, ':OR'+i+':$1:CR'+i+':');
		i++;
	}
	return(s)
}
function specialReplace(s, a, b){
	while (s.search(a) != -1)
		s=s.replace(a,b);
	return(s);
}
//-----------------------------------------------------------------------------------------
var refLabels = [];
var theBlockLabel = "theChapter+'.'+theBlock";

function numberSections(s){
	var chapters=s.split('\\chapter');
	var sect;
	var subsect;
	var block;
	var i,j,k,n;
	var theChapter, theSection, theSubsection, theBlock;
	for (theChapter=0;theChapter<chapters.length;theChapter++){
		if (theChapter>0){
			if (chapters[theChapter].search(/^{([^}]*)}\s*\\label{([^}]*)}/) !=-1){
				refLabels[chapters[theChapter].match(/^{[^}]*}\s*\\label{([^}]*)}/)[1]]=theChapter;
				chapters[theChapter]=chapters[theChapter].replace(/^{([^}]*)}\s*\\label{([^}]*)}/, '<div class="chapter" id="$2"><div class="heading chapterHeading">Chapter '+theChapter+' $1</div>');
			}
			else
				chapters[theChapter]=chapters[theChapter].replace(/^{([^}]*)}/, '<div class="chapter"><div class="heading chapterHeading">Chapter '+theChapter+' $1</div>');
			chapters[theChapter]=chapters[theChapter]+'</div>';
		}
		sect=chapters[theChapter].split('\\section');
		for (theSection=0;theSection<sect.length;theSection++){
			if (theSection>0){
				if (sect[theSection].search(/^{([^}]*)}\s*\\label{([^}]*)}/) !=-1){
					refLabels[sect[theSection].match(/^{[^}]*}\s*\\label{([^}]*)}/)[1]]=theChapter+'.'+theSection;
					sect[theSection]=sect[theSection].replace(/^{([^}]*)}\s*\\label{([^}]*)}/, '<div class="section" id="$2"><div class="heading sectionHeading">'+theChapter+'.'+theSection+' $1</div>');
				}
				else
					sect[theSection]=sect[theSection].replace(/^{([^}]*)}/, '<div class="section"><div class="heading sectionHeading">'+theChapter+'.'+theSection+' $1</div>');
				sect[theSection]=sect[theSection]+'</div>';
			}
			subsect=sect[theSection].split('\\subsection');
			for (theSubsection=0;theSubsection<subsect.length;theSubsection++){
				if (theSubsection>0){
					if (subsect[theSubsection].search(/^{([^}]*)}\s*\\label{([^}]*)}/) !=-1){
						refLabels[subsect[theSubsection].match(/^{[^}]*}\s*\\label{([^}]*)}/)[1]]=theChapter+'.'+theSection+'.'+theSubsection;
						subsect[theSubsection]=subsect[theSubsection].replace(/^{([^}]*)}\s*\\label{([^}]*)}/, '<div class="subsection" id="$2"><div class="heading subsectionHeading">'+theChapter+'.'+theSection+'.'+theSubsection+' $1</div>');
					}
					else
						subsect[theSubsection]=subsect[theSubsection].replace(/^{([^}]*)}/, '<div class="subsection"><div class="heading subsectionHeading">'+theChapter+'.'+theSection+'.'+theSubsection+' $1</div>');
					subsect[theSubsection]=subsect[theSubsection]+'</div>';
				}
//---------------------------------------------
				block=subsect[theSubsection].split('\\NBLOCK');
				for (theBlock=0;theBlock<block.length;theBlock++){
					if (theBlock>0){
//						refLabels[block[theBlock].match(/^{([^}]*)}{([^}]*)}/)[2]]=theChapter+'.'+theSection+'.'+theSubsection+'.'+theBlock;
						refLabels[block[theBlock].match(/^{([^}]*)}{([^}]*)}/)[2]]=eval(theBlockLabel);
//						block[theBlock]=block[theBlock].replace(/^{([^}]*)}{([^}]*)}/, '<div class="$1" id="$2"><div class="$1Heading">$1 '+theChapter+'.'+theSection+'.'+theSubsection+'.'+theBlock+':</div>');
						block[theBlock]=block[theBlock].replace(/^{([^}]*)}{([^}]*)}/, '<div class="$1" id="$2"><div class="heading $1Heading">$1 '+eval(theBlockLabel)+':</div>');
					}
				subsect[theSubsection]=block.join(' ');
				}
//---------------------------------------------				
			sect[theSection]=subsect.join(' ');
			}
		chapters[theChapter]=sect.join(' ');
		}
	}
	s=chapters.join(' ');
	return(s);
}
function handleRefs(s){
	var i,r;
	for (i in refLabels)
		while (s.indexOf('\\ref{'+i+'}') > -1)
			s=s.replace('\\ref{'+i+'}',refLabels[i]);
	return(s);
}

var	titleRegEx = /\\title:OB(\d+):([^]*):CB\1:/
var	authorRegEx = /\\author:OB(\d+):([^]*):CB\1:/
var	dateRegEx = /\\date:OB(\d+):([^]*):CB\1:/

function handleTitle(s){
	var m;
	m=titleRegEx.exec(s);
	if (m!= null) THETITLE = m[2];
	m = authorRegEx.exec(s);
	if (m!= null) THEAUTHOR = m[2];
	m = dateRegEx.exec(s);
	if (m!= null) THEDATE = m[2];
}
function replaceTitle(s){
	s=s.replace(/\\title/g, THETITLE);
	s=s.replace(/\\author/g, THEAUTHOR);
	s=s.replace(/\\date/g, THEDATE);
	s=s.replace(/\\maketitle/g, '<div class="titleBlock"><div class="title">'+THETITLE+'</div><div class="author">'+THEAUTHOR+'</div><div class="date">'+THEDATE+'</div></div>');
	
	return(s);
}
function preservePercents(s){
	s=s.replace(/\\\%/g, '&#37;');
	return(s);
}
function putBracesBack(s){
	while (s.search(/:OP\d+:/) != -1)
		s=s.replace(/:OP\d+:/,'(');
	while (s.search(/:CP\d+:/) != -1)
		s=s.replace(/:CP\d+:/,')');
	while (s.search(/:OR\d+:/) != -1)
		s=s.replace(/:OR\d+:/,'[');
	while (s.search(/:CR\d+:/) != -1)
		s=s.replace(/:CR\d+:/,']');
	while (s.search(/:OB\d+:/) != -1)
		s=s.replace(/:OB\d+:/,'{');
	while (s.search(/:CB\d+:/) != -1)
		s=s.replace(/:CB\d+:/,'}');
	s=s.replace(/:ampand:/g, '&');
	return(s);
}
//-----------------------------------------------------------------------------------------
function compile(inString){
	var i;
	var s = inString;
	s=s.replace(/\&/g, ':ampand:');
	s=preservePercents(s);
	s=removeComments(s);
	s=handleDoubleDollar(s);
	s=handleDollar(s);

	for(i=0;i<URGENT;i++)
		s=s.replace(RA[i][0], RA[i][1]);	
	s=numberSections(s);
	s=handleRefs(s);
	for(i=URGENT;i<SPECIAL;i++)
		s=s.replace(RA[i][0], RA[i][1]);
	s=matchBraces(s);
	handleTitle(s);
	for (i=SPECIAL;i<RAL;i++)
		s=specialReplace(s, RA[i][0], RA[i][1]);
	s=replaceTitle(s);
	s=s.replace(/\\\\/g, '<br>');

	s=putBracesBack(s);
	return(s);
	}

/*
	Matches 'x' and remembers the match, as the following example shows. The parentheses are called capturing parentheses.

The '(foo)' and '(bar)' in the pattern /(foo) (bar) \1 \2/ match and remember the first two words in the string "foo bar foo bar". The \1 and \2 in the pattern match the string's last two words. Note that \1, \2, \n are is used in the matching part of the regex. In the replacement part of a regex the syntax $1, $2, $n must be used, e.g.: 'bar foo'.replace( /(...) (...)/, '$2 $1' ).
*/	