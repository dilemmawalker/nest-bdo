class Solution {
    public int maxNumberOfFamilies(int n, int[][] rs) {
        int m=10;
        int c=0;
        HashMap<Integer,HashSet<Integer>>map=new HashMap<>();
        
        for(int i=0;i<rs.length;i++){
            int r=rs[i][0];
            int col=rs[i][1];
            if(!map.containsKey(r-1))
            map.put(r-1,new HashSet<>());
            map.get(r-1).add(col-1);
        }
        for(int i=0;i<n;i++){
            HashSet<Integer>temp=new HashSet<>();
        if(!map.containsKey(i)){
             c+=2;
            continue;
        }
            temp=map.get(i);
            int a=1;
            int idx2=1;
            if(temp.contains(idx2) || temp.contains(idx2+1) || temp.contains(idx2+2) || temp.contains(idx2+3))
            a=0;
            c+=a;
            if(a==1){
                idx2=5;
                if(temp.contains(idx2) || temp.contains(idx2+1) || temp.contains(idx2+2) || temp.contains(idx2+3))
                c+=0;
                else
                c+=1;
            }
            else{
                int bb=1,cc=1;
                idx2=3;
                if(temp.contains(idx2) || temp.contains(idx2+1) || temp.contains(idx2+2) || temp.contains(idx2+3))
                bb=0;
                idx2=5;
                if(temp.contains(idx2) || temp.contains(idx2+1) || temp.contains(idx2+2) || temp.contains(idx2+3))
                cc=0;
                c+=Math.max(bb,cc);
            }
        }
        return c;
    }
    
}